import { supabase } from "../lib/supabase-client";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useCallback, useEffect, useRef, useState } from "react";

const generateRandomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;
const generateRandomNumber = () => Math.floor(Math.random() * 100);
const EVENT_NAME = "realtime-cursor-move";
type Cursor = { x: number; y: number };

type CursorEventPayload = {
  position: Cursor; // you decide if this is raw pixels or normalized 0..1
  user: { id: number };
  color: string;
  timestamp: number;
};

export const useCursorPresences = ({ roomName, throttleMs = 40 }: { roomName: string; throttleMs: number }) => {
  const [color] = useState(generateRandomColor());
  const [userId] = useState(generateRandomNumber());
  const [cursors, setCursors] = useState<Record<string, CursorEventPayload>>({});

  const channelRef = useRef<RealtimeChannel | null>(null);
  const lastCall = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sendCursor = useCallback(
    (pos: Cursor) => {
      const payload: CursorEventPayload = {
        position: pos,
        user: { id: userId },
        color,
        timestamp: Date.now(),
      };
      channelRef.current?.send({
        type: "broadcast",
        event: EVENT_NAME,
        payload,
      });
    },
    [color, userId],
  );

  const pushCursor = useCallback(
    (pos: Cursor) => {
      const now = performance.now();
      const remain = throttleMs - (now - lastCall.current);

      // throttle ing
      if (remain <= 0) {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }
        lastCall.current = now;
        sendCursor(pos);
      } else if (!timer.current) {
        timer.current = setTimeout(() => {
          lastCall.current = performance.now();
          timer.current = null;
          sendCursor(pos);
        }, remain);
      }
    },
    [sendCursor, throttleMs],
  );

  useEffect(() => {
    const ch = supabase.channel(roomName);
    channelRef.current = ch;

    ch.on("broadcast", { event: EVENT_NAME }, (data: { payload: CursorEventPayload }) => {
      const payload = data.payload;
      if (!payload) return;

      // ignore your own broadcast
      if (payload.user.id === userId) return;

      setCursors((prev) => {
        const next = { ...prev };
        next[payload.user.id] = payload;
        return next;
      });
    });

    ch.subscribe();

    return () => {
      ch.unsubscribe();
      channelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName]);

  const removeCursor = useCallback((peerId: string) => {
    setCursors((prev) => {
      const next = { ...prev };
      delete next[peerId];
      return next;
    });
  }, []);

  return {
    cursors,
    pushCursor,
    removeCursor,
    channel: channelRef.current,
    color,
  };
};
