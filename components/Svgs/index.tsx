type IconProps = {
    className?: string;
    width?: string;
    height?: string;
    fill?: string;
  };
  
  const Search = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="11.7664" cy="11.7666" r="8.98856" stroke="#8E929E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18.0181 18.4852L21.5421 22.0001" stroke="#8E929E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };
  
  const Hambar = () => {
    return (
      <svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="35" height="34" fill="white" />
        <line x1="10" y1="9.5" x2="25" y2="9.5" stroke="#2B3674" />
        <line x1="10" y1="16.5" x2="25" y2="16.5" stroke="#2B3674" />
        <line x1="10" y1="23.5" x2="25" y2="23.5" stroke="#2B3674" />
      </svg>
    );
  };
  
  const ArrowDownFill = ({ className, fill }: IconProps) => {
    return (
      <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 15.5L10 10.5H20L15 15.5Z" fill="url(#paint0_linear_639_4976)" />
        <defs>
          <linearGradient id="paint0_linear_639_4976" x1="7.16" y1="13" x2="23.88" y2="13" gradientUnits="userSpaceOnUse">
            <stop offset="0.0512319" stopColor="#FFF0B5" />
            <stop offset="0.927673" stopColor="#FEACF6" />
          </linearGradient>
        </defs>
      </svg>
    );
  };
  
  const NotificationIcon = () => {
    return (
      <svg width="26" height="26" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_47_8013)">
          <path d="M25.7193 23.5533L23.9993 21.8333V15.1667C23.9993 11.0733 21.8127 7.64666 17.9993 6.73999V5.83333C17.9993 4.72666 17.106 3.83333 15.9993 3.83333C14.8927 3.83333 13.9993 4.72666 13.9993 5.83333V6.73999C10.1727 7.64666 7.99934 11.06 7.99934 15.1667V21.8333L6.27934 23.5533C5.43934 24.3933 6.026 25.8333 7.21267 25.8333H24.7727C25.9727 25.8333 26.5593 24.3933 25.7193 23.5533ZM21.3327 23.1667H10.666V15.1667C10.666 11.86 12.6793 9.16666 15.9993 9.16666C19.3193 9.16666 21.3327 11.86 21.3327 15.1667V23.1667ZM15.9993 29.8333C17.466 29.8333 18.666 28.6333 18.666 27.1667H13.3327C13.3327 28.6333 14.5193 29.8333 15.9993 29.8333Z" fill="#A3AED0" />
        </g>
        <defs>
          <clipPath id="clip0_47_8013">
            <rect width="32" height="32" fill="white" transform="translate(0 0.5)" />
          </clipPath>
        </defs>
      </svg>
    );
  };
  
  const RoundedPlus = ({ className }: IconProps) => {
    return (
      <svg className={className ? className : ''} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.3335 7.3335V4.66683H8.66683V7.3335H11.3335V8.66683H8.66683V11.3335H7.3335V8.66683H4.66683V7.3335H7.3335ZM8.00016 14.6668C4.31826 14.6668 1.3335 11.682 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.682 1.3335 14.6668 4.31826 14.6668 8.00016C14.6668 11.682 11.682 14.6668 8.00016 14.6668ZM8.00016 13.3335C10.9457 13.3335 13.3335 10.9457 13.3335 8.00016C13.3335 5.05464 10.9457 2.66683 8.00016 2.66683C5.05464 2.66683 2.66683 5.05464 2.66683 8.00016C2.66683 10.9457 5.05464 13.3335 8.00016 13.3335Z" fill="#000300" />
      </svg>
    );
  };
  
  const BellNotification = ({ className }: IconProps) => {
    return (
      <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z" fill="url(#paint0_linear_515_13673)" />
        <defs>
          <linearGradient id="paint0_linear_515_13673" x1="-2.112" y1="12.75" x2="27.984" y2="12.75" gradientUnits="userSpaceOnUse">
            <stop offset="0.0512319" stopColor="#FFF0B5" />
            <stop offset="0.927673" stopColor="#FEACF6" />
          </linearGradient>
        </defs>
      </svg>
    );
  };
  
  const ArrowDown = ({ className, fill }: IconProps) => {
    return (
      <svg width="10" height="6" className={className ? className : ''} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 5.5L0 0.5H10L5 5.5Z" fill={fill ? fill : "white"} />
      </svg>
    );
  };


  
  export { Search, Hambar,ArrowDownFill, NotificationIcon, RoundedPlus, BellNotification, ArrowDown };
  