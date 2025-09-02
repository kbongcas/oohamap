import type { UserPresence } from "../hooks/use-user-presences";

interface PresenceBarProps {
  users: Record<string, UserPresence>;
}

const PresenceBar: React.FC<PresenceBarProps> = ({ users }) => {
  return (
    <div className="menu menu-horizontal bg-base-200 rounded-box gap-2">
      {Object.values(users)?.map((user, index) => (
        <div key={index} className="tooltip tooltip-bottom" data-tip={user.name}>
          <div className="avatar">
            <div className="w-6 rounded">
              <img
                src="https://img.daisyui.com/images/profile/demo/superperson@192.webp"
                alt="Tailwind-CSS-Avatar-component"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PresenceBar;
