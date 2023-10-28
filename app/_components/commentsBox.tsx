type Props = {
  comment: string;
  visible: boolean;
  onClick: () => void;
  box: boolean;
};

const CommentsBox = ({ comment, visible, onClick, box }: Props) => {
  return (
    <div>
      &times;
      {visible && <>commentsBox</>}
    </div>
  );
};

export default CommentsBox;
