import React from "react";

import "../styles/homepage.scss";

export default function homepage() {
  return (
    <>
      <nav>Hello</nav>
      <section className="opening">
        <h1>DISCOVER</h1>
        <p>this is the next great thing and here are 2 reasons why</p>
        <p onClick={() => document.getElementById("sect-2")!.scrollIntoView()}>
          this is a cool button
        </p>
      </section>

      <div id="sect-2" className="spacer spacer-1"></div>

      <section className="background-dark">
        <h1>HELLO</h1>
        <p>
          Aliquam porro pariatur impedit inventore laudantium nihil et enim sed
          consequuntur officiis, ipsa iure ab modi totam. Est velit nemo
          deserunt dolor suscipit in quae quo, ad, facere earum illo!
        </p>
      </section>
      <section className="background-dark">
        <h1>HELLO</h1>
        <p>
          Earum optio voluptatum facilis? Repellendus consequatur, aliquid,
          veniam porro asperiores totam omnis facilis laborum facere debitis
          cumque error ullam doloremque praesentium soluta! Dicta ad repellat ab
          qui sapiente, error iure.
        </p>
      </section>
    </>
  );
}
