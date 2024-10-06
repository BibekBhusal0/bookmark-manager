import logo from "@assets/img/logo.svg";

export default function Popup(): JSX.Element {
  return (
    <div className="size-80 text-center bg-gray-800">
      <header className="flex flex-col items-center justify-center text-white">
        <img
          src={logo}
          className="h-36 pointer-events-none animate-spin-slow"
          alt="logo"
        />
        <p>
          Edit <code>src/pages/popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className=" text-blue-400"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          Learn React!
        </a>
        <p>This is a popup!</p>
      </header>
    </div>
  );
}
