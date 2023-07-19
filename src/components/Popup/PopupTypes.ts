export interface IPopupProps extends IWithReactChildren {
  title: string;
  showPopup: boolean;
  handleClosePopup: () => void;
  hasCloseIcon?: boolean;
}
