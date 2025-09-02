import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";
import { generateRandomName } from "../utils/random-name-generator";

export type UserPresence = {
  name?: string;
  color?: string;
};

export const useUserPresences = (roomName: string) => {

  const [userPresences, setUserPresences] = useState<Record<string, UserPresence>>({})

  useEffect(() => {
    const room = supabase.channel(roomName)

    room
      .on('presence', { event: 'sync' }, () => {
        const newState = room.presenceState<UserPresence>()

        const newUsers = Object.fromEntries(
          Object.entries(newState).map(([key, values]) => [
            key,
            {
              ...values[0],
            }
          ])
        ) as Record<string, UserPresence>
        setUserPresences(newUsers)
      })
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') {
          return
        }

        await room.track({
          name: generateRandomName(),
          color: "#FFFFFF",
        })
      })

    return () => {
      room.unsubscribe()
    }
  }, [roomName])

  return { userPresences }

};
