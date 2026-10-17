import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './Modal.module.css';

export interface ModalProps {
  title: string;
  description?: string;
  onClose: () => void;
  /** 넓은 폼(두 열)이면 'wide' */
  size?: 'md' | 'wide';
  children: ReactNode;
}

/**
 * 네이티브 <dialog> 기반 팝업. showModal() 이 포커스 가둠·Esc 닫기·inert 를 처리한다.
 * 배경 클릭도 닫힘. 유리 재질(.plate) 위에 내용이 놓인다.
 */
export function Modal({ title, description, onClose, size = 'md', children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  // 마운트 시 showModal, 언마운트 시 close. onClose 는 부모가 useCallback 으로 고정해 effect 가 매 렌더링마다 재실행되지 않는다.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    const handleCancel = (e: Event) => {
      e.preventDefault(); // 브라우저 기본 close 대신 라우터가 닫는다
      onClose();
    };
    dialog.addEventListener('cancel', handleCancel);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      document.body.style.overflow = overflow;
      if (typeof dialog.close === 'function') {
        if (dialog.open) dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
    };
  }, [onClose]);

  return (
    <dialog
      ref={ref}
      className={[styles.dialog, size === 'wide' ? styles.wide : ''].join(' ')}
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // 배경(backdrop) 클릭
      }}
    >
      <div className={['plate', styles.panel].join(' ')}>
        <header className={styles.head}>
          <div>
            <h2 id="modal-title" className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="닫기">
            <Icon name="close" size={18} />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </dialog>
  );
}
