import { TailChase, Mirage } from 'ldrs/react';
import 'ldrs/react/TailChase.css';
import 'ldrs/react/Mirage.css';

export default function Loader() {
  return (
    <div>
      <TailChase size={25} speed={2} color="white" />
    </div>
  );
}

// Default values shown
function Helix_() {
  return (
    <div>
      <Mirage size={100} speed={2} color="white" />
    </div>
  );
}
export { Helix_ };
