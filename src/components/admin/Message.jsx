import "./Message.css";

const Message = ({ msg, m_s }) => {
  console.log("m_s:", m_s);
  return (
    <div className={m_s}>
      {/* <p>{msg}</p> */}
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

export default Message;
