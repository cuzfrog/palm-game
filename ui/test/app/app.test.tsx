import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {store} from "src/store";
import App from "src/app/app";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Provider store={store}><App/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
