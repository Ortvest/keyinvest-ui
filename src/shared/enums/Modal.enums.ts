export const ModalTypes = {
  LOGIN: 'login',
  REGISTRATION: 'registration',
} as const;

export type ModalType = typeof ModalTypes;

export interface ModalState {
  type: ModalType | null;
}

export interface ModalProps {
  onCloseHandler: () => void;
}
