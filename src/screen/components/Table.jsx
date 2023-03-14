import {
  Card,
  DataTable,
  Page,
  Button,
  Stack,
  Layout,
  Spinner,
} from "@shopify/polaris";
import { useState, useEffect } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../../App";

import Templates from "./Templates";
import Edit from "./Edit";
import styled from "styled-components";

const ActiveButton = styled.button`
  padding: 7px 20px;
  border: 0px;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  background: #ffffff;
  border: ${(props) =>
    props.active ? "1px solid #3EB372" : "1px solid #FA931C"};
  border: ${(props) => (props.delete ? "1px solid red" : " ")};
  color: ${(props) => (props.active ? " #3EB372" : "#FA931C")};
  color: ${(props) => (props.edit ? " blue" : "")};
  border: ${(props) => (props.edit ? "1px solid blue" : " ")};

  color: ${(props) => (props.delete ? "red" : "")};
  &:hover {
    background: #efefef;
  }
`;

export const Table = ({ closeAnimate }) => {
  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);
  const [actived, setActive] = useState();
  const [loading, setloading] = useState(false);

  const [templates, set_templates] = useState([]);
  const [openState, setOpenState] = useState(false);
  const [choosedTemplate, setChoosedTemplate] = useState("");
  const [editOption, setEdit] = useState(false);
  const [editData, setEditData] = useState();

  async function getTemplate() {
    setloading(true);

    const count = await fetch(`/announcementBar`).then((res) => res.json());
    set_templates(count);
    count.map((e) => {
      if (e.isActive === "true") {
        setActive(e.uuid);
      }
    });
    setloading(false);

    const theme = await fetch(`/theme`).then((res) => res.json());
  }

  async function deleted(e) {
    var data = await fetch(`/delete/${e}`, {
      method: "Delete",
    });
    getTemplate();
  }

  async function activate(e) {
    setloading(true);
    await fetch(`/update/${e.uuid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: "true" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setloading(false);
        if (data.success) {
          setActive(e.uuid);
        } else {
          setActive();
        }
      });
    // getTemplate()
    // }
  }

  const add = () => {
    closeAnimate();
    if (openState === false) {
      setOpenState(true);
    } else {
      setOpenState(false);
    }
  };
  const edit = (info) => {
    setEdit(true);
    setOpenState(false);
    setEditData(info.uuid);
  };
  const close = () => {
    setOpenState(false);
    setEdit(false);
  };

  useEffect(async () => {
    getTemplate();
  }, []);

  return (
    <Page fullWidth>
      <Layout>
        {editOption ? (
          <></>
        ) : (
          <>
            {" "}
            <Layout.Section>
              <Stack distribution="trailing">
                {" "}
                <Button primary onClick={add}>
                  {openState ? "Close" : "Create New Bar"}
                </Button>{" "}
              </Stack>
            </Layout.Section>
            <Layout.Section>
              {loading ? (
                <div id="spinner">
                  <Spinner accessibilityLabel="Spinner example" size="large" />
                </div>
              ) : (
                <Card>
                  <DataTable
                    columnContentTypes={["number", "text", "text", "text"]}
                    headings={["Item.No", "Name", "Preview ", "Action"]}
                    rows={templates.map((info, index) => {
                      return [
                        index + 1,
                        info.name,
                        <Stack>
                          <div
                            style={{
                              //
                              padding: "3px 40px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: info.background,
                              color: info.fontColor,
                              fontSize: "12px",
                              borderRadius: "4px",
                            }}
                          >
                            <span> {info.content}</span>
                            <span
                              style={{
                                fontSize: "12px",
                                paddingLeft: "10px",
                                color: info.specialTextColor,
                              }}
                            >
                              {info.currencyContent}
                            </span>{" "}
                          </div>
                          ,
                        </Stack>,
                        <Stack>
                          <ActiveButton
                            active={info.uuid === actived}
                            onClick={() => activate(info)}
                          >
                            {info.uuid === actived ? "Actived " : "Paused"}
                          </ActiveButton>
                          <ActiveButton edit onClick={() => edit(info)}>
                            Edit
                          </ActiveButton>

                          <ActiveButton
                            delete
                            onClick={() => deleted(info.uuid)}
                          >
                            Delete
                          </ActiveButton>
                        </Stack>,
                      ];
                    })}
                  />
                </Card>
              )}

              {loading ? (
                ""
              ) : templates.length === 0 ? (
                <div class="msg">There Is No Templates Found</div>
              ) : (
                ""
              )}
            </Layout.Section>
          </>
        )}
        <Layout.Section>
          {openState ? (
            <Templates getTemplate={getTemplate} closeTemplate={close} />
          ) : null}
          {editOption ? (
            <Edit
              getTemplate={getTemplate}
              closeTemplate={close}
              value={editData}
            />
          ) : null}
        </Layout.Section>
      </Layout>
    </Page>
  );
};
