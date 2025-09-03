import type { UserPresence } from "../hooks/use-user-presences";

interface PresenceBarProps {
  users: Record<string, UserPresence>;
}

const PresenceBar: React.FC<PresenceBarProps> = ({ users }) => {
  return (
    <div className="avatar-group -space-x-6">
      {Object.values(users)?.map((user, index) => (
        <div key={index} className="tooltip tooltip-bottom" data-tip={user.name}>
          <div className="avatar">
            <div className="w-7 rounded">
              <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PresenceBar;
