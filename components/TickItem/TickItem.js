import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export function TickItem({ children }) {
  return (
    <div className="grid grid-cols-[50px_1fr] gap-3">
      <div className="text-3xl text-green-500 flex justify-center items-center">
        <FontAwesomeIcon icon={faCircleCheck} />
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  )
}