import {
  Checkbox,
  Col,
  DatePicker,
  Layout,
  Modal,
  Row,
  Select,
  Table,
  TimePicker,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Search from "../common/Search";
import { EditorIcon } from "../icons/EditorIcon";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import moment from "moment";
import { CSVLink } from "react-csv";
interface Props {
  setTagIndex: React.Dispatch<React.SetStateAction<string>>;
}

interface Item {
  maGoi: string;
  ngayhethan: number;
  ngayapdung: number;
  id: string;
  tenGoi: string;
  giave: number;
  giacombo: number;
  tinhtrang: number;
  stt: number;
}

const Setting = ({ setTagIndex }: Props) => {
  const [dataTicketPage, setDataTicketPage] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [item, setItem] = useState<Item>({
    maGoi: "ABCDEF10",
    ngayhethan: 0,
    ngayapdung: 0,
    id: "04G1r7p26PdNIhQSsOfK",
    tenGoi: "AAAAAA10",
    giave: 0,
    giacombo: 0,
    tinhtrang: 1,
    stt: 10,
  });

  useEffect(() => {
    setTagIndex("setting");
    const data = async () => {
      // const ticket = await getDocs(collection(db, "ticket"));
      // const ticketData = ticket.docs.map((item: any) => {
      //   return {
      //     ...item.data(),
      //     id: item.id,
      //   };
      // });
      // const q = query(
      //   collection(db, "ticket"),
      //   where("author", "==", "patrick rothfuss"),
      //   orderBy("createdAt")
      // );
      onSnapshot(collection(db, "setting"), (snapshot: any) => {
        const books: any = [];
        snapshot.docs.forEach((doc: any) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        setDataTicketPage(books.sort((a: any, b: any) => a.stt - b.stt));
        setData(books.sort((a: any, b: any) => a.stt - b.stt));
      });
    };
    data();
  }, [setTagIndex]);

  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [ten, setTen] = useState("");
  const [fdate, setFdate] = useState(0);
  const [tdate, setTdate] = useState(0);
  const [giave, setGiave] = useState(0);
  const [giacombo, setGiacombo] = useState(0);
  const [tinhtrang, setTinhtrang] = useState(1);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (stt: string) => {
        return <div>{stt}</div>;
      },
    },
    {
      title: () => <div style={{}}>Mã gói</div>,
      dataIndex: "maGoi",
      render: (stt: string) => {
        return <div style={{}}>{stt}</div>;
      },
    },
    {
      title: () => <div style={{}}>Tên gói</div>,
      dataIndex: "tenGoi",
      render: (stt: string) => {
        return <div style={{}}>{stt}</div>;
      },
    },
    {
      title: () => (
        <div
          style={{
            textAlign: "right",
          }}
        >
          Ngày áp dụng
        </div>
      ),
      dataIndex: "ngayapdung",
      render: (date: number) => {
        const d = new Date(date).toLocaleDateString("vi-VN");
        return (
          <div
            style={{
              textAlign: "right",
            }}
          >
            {d}
          </div>
        );
      },
    },
    {
      title: () => (
        <div
          style={{
            textAlign: "right",
          }}
        >
          Ngày hết hạn
        </div>
      ),
      dataIndex: "ngayhethan",
      render: (date: number) => {
        const d = new Date(date).toLocaleDateString("vi-VN");
        return (
          <div
            style={{
              textAlign: "right",
            }}
          >
            {d}
          </div>
        );
      },
    },
    {
      title: () => <div style={{}}>Giá vé {"(VND/Vé)"}</div>,
      dataIndex: "giave",
      render: (p: number) => {
        return (
          <div style={{}}>
            {p.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
          </div>
        );
      },
    },
    {
      title: () => <div style={{}}>Giá vé {"(VND/Combo)"}</div>,
      dataIndex: "giacombo",
      render: (p: number) => {
        return (
          <div style={{}}>
            {" "}
            {p.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
            /4 Vé
          </div>
        );
      },
    },
    {
      title: () => <div style={{}}>Tình trạng</div>,
      dataIndex: "tinhtrang",
      render: (status: number) => {
        switch (status) {
          case 1:
            return (
              <div
                style={{
                  width: "fit-content",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#03AC00",
                  backgroundColor: "#DEF7E0",
                  border: "1px solid #03AC00",
                  borderRadius: "4px",
                  height: "31px",
                }}
              >
                <span style={{ fontSize: "18px", marginRight: "8px" }}>●</span>
                Đang áp dụng
              </div>
            );
          default:
            return (
              <div
                style={{
                  width: "fit-content",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#FD5959",
                  backgroundColor: "#F8EBE8",
                  border: "1px solid #FD5959",
                  borderRadius: "4px",
                  height: "31px",
                }}
              >
                <span style={{ fontSize: "18px", marginRight: "8px" }}>●</span>
                Tắt
              </div>
            );
        }
      },
    },

    {
      title: "",
      render: (item: any) => {
        return (
          <div
            style={{
              color: "#FF993C",
              fontWeight: "500",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              setModalUpdate(true);
              setItem(item);
            }}
          >
            <EditorIcon />
            <span style={{ marginLeft: "4px" }}>Cập nhật</span>
          </div>
        );
      },
    },
  ];

  return (
    <Layout.Content
      style={{
        borderRadius: "24px",
        minHeight: "963px",
        backgroundColor: "white",
        padding: "34px 24.5px",
      }}
    >
      <Typography.Title
        style={{ marginBottom: "46px", fontSize: "36px", fontWeight: "700" }}
      >
        Danh sách gói vé
      </Typography.Title>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Search
          size="445px"
          placeholder="Tìm bằng số vé"
          onChange={(e) => {
            setDataTicketPage(
              data.filter((item) => item.sove.toString().includes(e))
            );
          }}
        />
        <div style={{ marginTop: "-4px" }}>
          <CSVLink data={dataTicketPage}>
            <Button padding="0 24px" margin="0 10px" width="fit-content">
              <span
                style={{
                  display: "inline-block",
                  transform: "translate(-6px, 4px)",
                }}
              ></span>
              Xuất file (.csv)
            </Button>
          </CSVLink>
          <Button width="180px" type="primary" onClick={() => setModal(true)}>
            Thêm gói vé
          </Button>
        </div>
      </div>
      <Table
        bordered={false}
        style={{ marginTop: "30px", alignItems: "center" }}
        dataSource={dataTicketPage}
        columns={columns}
        pagination={{
          pageSize: 12,
          style: {
            marginTop: "48px",
            display: "flex",
            justifyContent: "center",
          },
          size: "small",
          prevIcon: () => <span style={{ color: "#A5A8B1" }}> &#9664;</span>,
          nextIcon: <span style={{ color: "#A5A8B1" }}> &#9654;</span>,
        }}
      />
      <Modal
        visible={modalUpdate}
        onOk={() => {
          const newData = [...dataTicketPage];
          const i = newData.findIndex((x) => x.id === item.id);
          newData[i] = item;
          let docRef = doc(db, "setting", item.id);

          updateDoc(docRef, {
            ...item,
          }).then(() => {
            setDataTicketPage(newData);
          });

          setModalUpdate(false);
        }}
        closeIcon={<></>}
        width="750px"
        bodyStyle={{ borderRadius: "16px" }}
        onCancel={() => setModalUpdate(false)}
        cancelText="Hủy"
        okButtonProps={{
          style: {
            marginRight: "230px",
            height: "40px",
            padding: "0 48px",
            borderRadius: "8px",
            backgroundColor: "#FF993C",
            border: "2px solid #FF993C",
            fontSize: "16px",
            fontWeight: "600",
          },
        }}
        cancelButtonProps={{
          style: {
            height: "40px",
            padding: "0 48px",
            borderRadius: "8px",
            border: "2px solid #FF993C",
            fontSize: "16px",
            color: "#FF993C",
            fontWeight: "600",
          },
        }}
        okText="Lưu"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "-4px" }}
          >
            Cập nhật thông tin gói vé
          </span>
        </div>
        <Row>
          <Col span={11}>
            <div style={{ marginTop: "24px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Mã sự kiện
              </span>
              <span style={{ color: "red" }}> *</span>
            </div>
            <input
              type="text"
              value={item.maGoi}
              onChange={(e) => {
                setItem({ ...item, maGoi: e.target.value });
              }}
              style={{
                padding: "20px",
                marginTop: "4px",
                border: "1px solid #A5A8B1",
                borderRadius: "8px",
                height: "40px",
                width: "250px",
              }}
            />
          </Col>
          <Col span={11}>
            <div style={{ marginTop: "24px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Tên sự kiện
              </span>
              <span style={{ color: "red" }}> *</span>
            </div>
            <input
              type="text"
              onChange={(e) => {
                setItem({ ...item, tenGoi: e.target.value });
              }}
              value={item.tenGoi}
              placeholder="Hội chợ triển lãm hàng tiêu dùng 2021"
              style={{
                padding: "20px",
                marginTop: "4px",
                border: "1px solid #A5A8B1",
                borderRadius: "8px",
                height: "40px",
                width: "370px",
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col span={11}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Ngày áp dụng
              </span>
            </div>
            <DatePicker
              onChange={(e) => {
                const d = e?.toDate().getTime();
                d && setItem({ ...item, ngayapdung: d });
              }}
              value={moment(item.ngayapdung)}
              style={{ height: "40px", width: "145px" }}
              // placeholder="dd:mm:yy"
            />
            <TimePicker
              value={moment(item.ngayapdung)}
              use12Hours
              format="h:mm:ss"
              placeholder="hh:mm:yy"
              style={{ width: 140, height: "40px", marginLeft: "8px" }}
            />
          </Col>
          <Col span={12}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "0px 4px" }}>
                Ngày hết hạn
              </span>
            </div>
            <DatePicker
              onChange={(e) => {
                const d = e?.toDate().getTime();
                d && setItem({ ...item, ngayhethan: d });
              }}
              value={moment(item.ngayhethan)}
              style={{ height: "40px", width: "145px" }}
              // placeholder="dd:mm:yyy"
            />
            <TimePicker
              value={moment(item.ngayhethan)}
              placeholder="hh:mm:yy"
              use12Hours
              format="h:mm:ss"
              style={{ width: 140, height: "40px", marginLeft: "8px" }}
            />
          </Col>
        </Row>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Giá vé áp dụng
        </div>
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "16px" }}
        >
          <Checkbox style={{ width: "20px" }}></Checkbox>Vé lẻ (vnđ/vé) với giá
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            <input
              type="number"
              defaultValue={item.giave}
              onChange={(e) =>
                setItem({ ...item, giave: Number(e.target.value) })
              }
              placeholder="Giá vé"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "none",
                outline: "none",
              }}
            />
          </div>
          /vé
        </div>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
          }}
        >
          <Checkbox style={{ width: "20px" }}></Checkbox>Combo vé với giá
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            <input
              defaultValue={item.giacombo}
              onChange={(e) =>
                setItem({ ...item, giacombo: Number(e.target.value) })
              }
              type="number"
              placeholder="Giá vé"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "none",
                outline: "none",
              }}
            />
          </div>
          /
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            <input
              defaultValue={4}
              placeholder="Giá vé"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "none",
                outline: "none",
              }}
            />
          </div>
          vé
        </div>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Tình trạng
        </div>
        <Select
          showSearch
          size="large"
          style={{ width: "180px", marginBottom: "20px" }}
          placeholder="Đang áp dụng"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.label as unknown as string).includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA!.label as unknown as string)
              .toLowerCase()
              .localeCompare(
                (optionB!.label as unknown as string).toLowerCase()
              )
          }
          options={[
            { label: "Đang áp dụng", value: 1 },
            { label: "Tắt", value: 0 },
          ]}
          onChange={(e) => {
            setItem({ ...item, tinhtrang: Number(e) });
          }}
        ></Select>

        <div>
          <span style={{ color: "red" }}> *</span>{" "}
          <span style={{ fontStyle: "italic" }}>là thông tin bắt buộc</span>
        </div>
      </Modal>
      <Modal
        visible={modal}
        onOk={() => {
          addDoc(collection(db, "setting"), {
            stt: Math.max(...data.map((o) => o.stt)) + 1,
            maGoi: "ABCDEF" + data.length + 1,
            tenGoi: ten,
            ngayapdung: fdate,
            ngayhethan: tdate,
            giave: giave,
            giacombo: giacombo,
            tinhtrang: tinhtrang,
          });

          setModal(false);
        }}
        closeIcon={<></>}
        width="750px"
        bodyStyle={{ borderRadius: "16px" }}
        onCancel={() => setModal(false)}
        cancelText="Hủy"
        okButtonProps={{
          style: {
            marginRight: "230px",
            height: "40px",
            padding: "0 48px",
            borderRadius: "8px",
            backgroundColor: "#FF993C",
            border: "2px solid #FF993C",
            fontSize: "16px",
            fontWeight: "600",
          },
        }}
        cancelButtonProps={{
          style: {
            height: "40px",
            padding: "0 48px",
            borderRadius: "8px",
            border: "2px solid #FF993C",
            fontSize: "16px",
            color: "#FF993C",
            fontWeight: "600",
          },
        }}
        okText="Lưu"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "-4px" }}
          >
            Thêm gói vé
          </span>
        </div>
        <div style={{ marginTop: "24px" }}>
          <span style={{ fontSize: "16px", margin: "opx 4px" }}>
            Tên gói vé
          </span>
          <span style={{ color: "red" }}> *</span>
        </div>
        <input
          type="text"
          placeholder="Nhập tên gói vé"
          style={{
            padding: "20px",
            marginTop: "4px",
            border: "1px solid #A5A8B1",
            borderRadius: "8px",
            height: "40px",
            width: "370px",
          }}
          onChange={(e) => setTen(e.target.value)}
        />
        <Row>
          <Col span={11}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Ngày áp dụng
              </span>
            </div>
            <DatePicker
              onChange={(e) => {
                const d = e?.toDate()?.getTime();
                d && setFdate(d);
              }}
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yy"
            />
            <TimePicker
              use12Hours
              format="h:mm:ss"
              placeholder="hh:mm:yy"
              style={{ width: 140, height: "40px", marginLeft: "8px" }}
            />
          </Col>
          <Col span={12}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "0px 4px" }}>
                Ngày hết hạn
              </span>
            </div>
            <DatePicker
              onChange={(e) => {
                const d = e?.toDate()?.getTime();
                d && setTdate(d);
              }}
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yyy"
            />
            <TimePicker
              placeholder="hh:mm:yy"
              use12Hours
              format="h:mm:ss"
              style={{ width: 140, height: "40px", marginLeft: "8px" }}
            />
          </Col>
        </Row>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Giá vé áp dụng
        </div>
        <div
          style={{ display: "flex", alignItems: "center", fontSize: "16px" }}
        >
          <Checkbox style={{ width: "20px" }}></Checkbox>Vé lẻ (vnđ/vé) với giá
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            <input
              type="number"
              onChange={(e) => setGiave(Number(e.target.value))}
              placeholder="Giá vé"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "none",
                outline: "none",
              }}
            />
          </div>
          /vé
        </div>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
          }}
        >
          <Checkbox style={{ width: "20px" }}></Checkbox>Combo vé với giá
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            <input
              type="number"
              onChange={(e) => setGiacombo(Number(e.target.value))}
              placeholder="Giá vé"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "none",
                outline: "none",
              }}
            />
          </div>
          /
          <div
            style={{
              color: "#A5A8B1",
              alignItems: "center",
              margin: "0 4px",
              padding: "0 8px",
              display: "inline-flex",
              height: "40px",
              width: "150px",
              background: "#F1F4F8",
              borderRadius: "8px",
            }}
          >
            <input
              type="number"
              placeholder="Giá vé"
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "none",
                outline: "none",
              }}
            />
          </div>
          vé
        </div>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Tình trạng
        </div>
        <Select
          showSearch
          size="large"
          style={{ width: "180px", marginBottom: "20px" }}
          placeholder="Đang áp dụng"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.label as unknown as string).includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA!.label as unknown as string)
              .toLowerCase()
              .localeCompare(
                (optionB!.label as unknown as string).toLowerCase()
              )
          }
          options={[
            { label: "Đang áp dụng", value: 1 },
            { label: "Tắt", value: 0 },
          ]}
          onChange={(e) => setTinhtrang(Number(e))}
        ></Select>

        <div>
          <span style={{ color: "red" }}> *</span>{" "}
          <span style={{ fontStyle: "italic" }}>là thông tin bắt buộc</span>
        </div>
      </Modal>
    </Layout.Content>
  );
};

export default Setting;
