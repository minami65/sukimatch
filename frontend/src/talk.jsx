import PageFooter from "./components/footer";
import "./styles/talk.css";
import sendButton from "./assets/send-button.png";
import picture from "./assets/picture.png";

export default function Talk() {
  const messages = [
    {
      date: "6/11",
      items: [
        { type: "other", time: "9:00", bubbles: ["large"] },
        { type: "me", time: "10:00", bubbles: ["large", "small"] },
        { type: "other", time: "15:00", bubbles: ["small", "large"] },
        { type: "me", time: "16:00", bubbles: ["small"] },
      ],
    },
    {
      date: "6/12",
      items: [
        { type: "other", time: "13:00", bubbles: ["small", "medium"] },
        { type: "me", time: "15:00", bubbles: ["large", "medium"] },
      ],
    },
  ];

  return (
    <div className="talkPage">
      <header className="talkHeader">
        <button className="backButton">&lt;</button>
        <div className="talkTitle">Y</div>
      </header>

      <main className="talkBody">
        <div className="heartBg">♡ ♡ ♡ ♡ ♡</div>

        {messages.map((group, groupIndex) => (
          <div key={groupIndex}>
            <div className="dateDivider">
              <span>{group.date}</span>
            </div>

            {group.items.map((message, index) => (
              <div key={index} className={`messageRow ${message.type}`}>
                {message.type === "other" && (
                  <div className="avatar">
                    <span>👤</span>
                  </div>
                )}

                <div className="messageContent">
                  <div className="bubbleList">
                    {message.bubbles.map((size, bubbleIndex) => (
                      <div
                        key={bubbleIndex}
                        className={`messageBubble ${message.type}Bubble ${size}`}
                      />
                    ))}
                  </div>

                  <span className="messageTime">{message.time}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </main>

      <div className="messageInputArea">
        <button className="imageSendButton">
          <img src={picture} alt="" />
        </button>

        <input placeholder="メッセージを入力" />

        <button className="sendButton">
          <img src={sendButton} alt="送信ボタン" />
        </button>
      </div>
      <div className="pageFooter">
        <PageFooter />
      </div>
    </div>
  );
}
