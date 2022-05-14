import 'react-quill/dist/quill.snow.css';

import React, { FC } from 'react';
import ReactQuill from 'react-quill';

// interface Props {
//   placeholder?: string;
//   value?: string;
// }

type Props = typeof ReactQuill.prototype.props;

const Editor: FC<Props> = (props) => {
  return <ReactQuill className="publish-quill" theme="snow" {...props} />;
};

Editor.defaultProps = {
  placeholder: '请输入文章内容',
};

export default Editor;
