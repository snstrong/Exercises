// Define a Tweet component which takes as props the username of the user who wrote the tweet, the name of the user who wrote the tweet, the date of the tweet, and the message being tweeted.

const Tweet = (props) => {
  return (
    <div>
      <p>
        <strong>{props.name}</strong> @{props.username} - {props.date}
      </p>
      <p>{props.message}</p>
    </div>
  );
};
