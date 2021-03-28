const App = () => (
  <div>
    <Tweet
      name="Sara Strong"
      username="snstrong"
      date="March 27"
      message="It's a tweet"
    />
    <Tweet
      name="Chris Hathhorn"
      username="chathhorn"
      date="March 27"
      message="Gotta do my DuoLingo for the day"
    />
    <Tweet
      name="Next Door Neighbor's Dog"
      username="mysteriousK9"
      date="March 27"
      message="Here I stand guard in stoic silence, casting my eye upon the neighborhood, bound by a solemn oath to witness all things that here transpire"
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
