const App = () => (
  <div>
    <FirstComponent />
    <NamedComponent name="Sara" />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
