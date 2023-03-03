import { Page, Image } from "@shopify/polaris";
import { Table } from "./components/Table.jsx";
import { useState, useEffect } from "react";
import "./style.css";
import styled from "styled-components";
import { Icon } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";

import {
  InfoMinor,
  PlayCircleMajor,
  ArrowLeftMinor,
} from "@shopify/polaris-icons";

const Container = styled.div`
  width: 90%;
  height: 400px;
  z-index: 100;
  border-radius: 10px;
  position: absolute;
  top: 10%;
  left: 5%;
`;

export function HomePage() {
  const [showInstruction, setInstruction] = useState(false);
  const [animation, setAnimation] = useState(false);
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  const open = () => {
    if (showInstruction === false) {
      setInstruction(true);
      setAnimation(false);
    } else {
      setInstruction(false);
    }
  };

  const closeAnimate = () => {
    setAnimation(false);
  };
  useEffect(async () => {
    const count = await fetch(`/shop`).then((res) => res.json());
    if (count.animate === true) {
      setAnimation(count.animate);
      const data = await fetch(`/shopUpdate`).then((res) => res.json());
    }
  });
  return (
    <Page fullWidth>
      <div style={{ display: "flex" }}>
        <h2
          style={{ marginRight: "10px", fontSize: "17px", fontWeight: "bold" }}
        >
          Announcement Bar (test):
        </h2>
        <div
          onClick={open}
          style={{ cursor: "pointer", display: "flex" }}
          title="Instruction"
        >
          <Icon source={InfoMinor} color="base" />
          <span>(Instruction)</span>
          {animation ? (
            <>
              <div className="icon">
                <Icon source={ArrowLeftMinor} />
                <span>Click Here .... </span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {showInstruction ? (
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              fontSize: "14px",
              fontWeight: "bolder",
              textDecoration: "underline",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <h1 style={{ marginRight: "5px" }}>INSTRUCTION:</h1>
              <Icon source={PlayCircleMajor} color="blue" />
              <a
                style={{ marginLeft: "3sdfsdfsdfsdfsdfsdfsdfsdfpx" }}
                href="https://www.loom.com/share/f8404a559b3e4f40bd117d6ebd995361"
                target="_blank"
              >
                Video Tutorial
              </a>
            </div>
          </div>
          <div>
            <ol>
              <li>
                You can create a new bar by clicking the "Create New Bar".
              </li>
              <li>Choose a template from basic templates.</li>

              <li>Add 'Content' and 'Design' configuration details.</li>
              <li>
                Once you complete it, click "Create Template" for creating a new
                template or click "Cancel" to abort the function.
              </li>

              <li>
                If a new template is created, it will be in a pause state. So
                click the "Paused" button to activate the template or click the
                "Activate" button to pause the template.
              </li>
              <li>
                Then go to the online store select "Themes" click "Customize"
                then go to "App Embeds" and enable the extension.
              </li>
            </ol>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "bolder",
                textDecoration: "underline",
              }}
            >
              <h3>Don't see the bar ?</h3>
            </div>
            <ol>
              <li>Refresh the website, the bar should display properly.</li>
              <li>
                If it still does not work, kindly contact us at
                support@themeparrot.com.
              </li>
            </ol>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                background: "white",
                color: "red",
                border: "1px solid red",
                padding: "10px",
                outline: "none",
                margin: "10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={open}
            >
              Close
            </button>
          </div>
        </Container>
      ) : (
        <Table closeAnimate={closeAnimate} />
      )}
    </Page>
  );
}
