const App = () => (
  <div>
    <Person
      name="Sara Strong"
      age={31}
      hobbies={[
        "gardening",
        "hiking",
        "crochet",
        "knitting",
        "baking sourdough bread",
      ]}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
