// components/Popup.tsx
import React from 'react';

interface PopupProps {
  isOpen: boolean;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  title,
  message,
  type = 'info',
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false
}) => {
  if (!isOpen) return null;

  const getPopupStyles = () => {
    const baseStyles = {
      backgroundColor: '#fff',
      border: '2px solid',
      color: '#333'
    };

    switch (type) {
      case 'success':
        return { ...baseStyles, borderColor: '#4caf50', backgroundColor: '#f1f8e9' };
      case 'error':
        return { ...baseStyles, borderColor: '#f44336', backgroundColor: '#ffebee' };
      case 'warning':
        return { ...baseStyles, borderColor: '#ff9800', backgroundColor: '#fff3e0' };
      default:
        return { ...baseStyles, borderColor: '#2196f3', backgroundColor: '#e3f2fd' };
    }
  };

  const getIconForType = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={{ ...popupStyle, ...getPopupStyles() }}>
        <div style={headerStyle}>
          <span style={iconStyle}>{getIconForType()}</span>
          <h3 style={titleStyle}>{title}</h3>
        </div>
        
        <div style={contentStyle}>
          <p style={messageStyle}>{message}</p>
        </div>
        
        <div style={buttonContainerStyle}>
          {showCancel && onCancel && (
            <button 
              onClick={onCancel}
              style={cancelButtonStyle}
            >
              {cancelText}
            </button>
          )}
          <button 
            onClick={onConfirm}
            style={confirmButtonStyle}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles for the popup component
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

const popupStyle: React.CSSProperties = {
  width: '90%',
  maxWidth: '400px',
  borderRadius: '10px',
  padding: '0',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  animation: 'fadeIn 0.3s ease-out',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px 20px',
  borderBottom: '1px solid #ddd',
};

const iconStyle: React.CSSProperties = {
  fontSize: '20px',
  marginRight: '10px',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 'bold',
};

const contentStyle: React.CSSProperties = {
  padding: '20px',
};

const messageStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '16px',
  lineHeight: '1.5',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px',
  padding: '15px 20px',
  borderTop: '1px solid #ddd',
};

const confirmButtonStyle: React.CSSProperties = {
  backgroundColor: '#2196f3',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  minWidth: '80px',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#666',
  border: '1px solid #ccc',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '14px',
  minWidth: '80px',
};

export default Popup;