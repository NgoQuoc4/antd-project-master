import {
  Col,
  DatePicker,
  Layout,
  Modal,
  Radio,
  Row,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Search from "../common/Search";
import { FilterIcon } from "../icons/FilterIcon";
import { Checkbox } from "antd";
import { db } from "../../firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { CSVLink } from "react-csv";

interface Props {
  setTagIndex: React.Dispatch<React.SetStateAction<string>>;
}
const Ticket = ({ setTagIndex }: Props) => {
  const [dataTicketPage, setDataTicketPage] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setTagIndex("ticket");
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
      onSnapshot(collection(db, "ticket"), (snapshot: any) => {
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

  const [datefrom, setFrom] = useState(0);
  const [dateto, setTo] = useState(0);
  const [status, setStatus] = useState(-2);

  const [check, setCheck] = useState<number[]>([1, 2, 3, 4, 5]);

  const onClick = (val: number) => {
    if (check.includes(0)) {
      const newCheck = check.filter((item: number) => item !== 0);
      setCheck([...newCheck, val]);
    } else {
      if (val === 0) {
        setCheck([0]);
      } else {
        if (check.includes(val)) {
          const newCheck = check.filter((item: number) => item !== val);
          setCheck([...newCheck]);
        } else {
          setCheck([...check, val]);
        }
      }
    }
  };
  useEffect(() => {
    if (check.length === 5) {
      setCheck([0]);
    }
  }, [check]);

  const [modal, setModal] = useState(false);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (stt: string) => {
        return <div>{stt}</div>;
      },
    },
    {
      title: () => <div style={{ marginLeft: "64px" }}>Booking code</div>,
      dataIndex: "macode",
      render: (stt: string) => {
        return <div style={{ marginLeft: "64px" }}>{stt}</div>;
      },
    },
    {
      title: "Số vé",
      dataIndex: "sove",
    },
    {
      title: () => <div style={{ marginLeft: "64px" }}>Tình trạng sử dụng</div>,
      dataIndex: "tinhtrangsudung",
      render: (status: number) => {
        switch (status) {
          case 0:
            return (
              <div
                style={{
                  marginLeft: "64px",
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
                Chưa sử dụng
              </div>
            );
          case 1:
            return (
              <div
                style={{
                  marginLeft: "64px",
                  width: "fit-content",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#919DBA",
                  backgroundColor: "#EAF1F8",
                  border: "1px solid #919DBA",
                  borderRadius: "4px",
                  height: "31px",
                }}
              >
                <span style={{ fontSize: "18px", marginRight: "8px" }}>●</span>
                Đã sử dụng
              </div>
            );
          case -1:
            return (
              <div
                style={{
                  marginLeft: "64px",
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
                Hết hạn
              </div>
            );
        }
      },
    },
    {
      title: () => (
        <div
          style={{
            textAlign: "right",
            marginRight: "32px",
          }}
        >
          Ngày sử dụng
        </div>
      ),
      dataIndex: "ngaysudung",
      render: (date: string) => {
        const dateTime = new Date(date).toLocaleDateString("vi-VN");
        return (
          <div
            style={{
              textAlign: "right",
              marginRight: "32px",
            }}
          >
            {dateTime}
          </div>
        );
      },
    },
    {
      title: () => (
        <div
          style={{
            textAlign: "right",
            marginRight: "32px",
          }}
        >
          Ngày xuất vé
        </div>
      ),
      dataIndex: "ngayxuatve",
      render: (date: string) => {
        const dateTime = new Date(date).toLocaleDateString("vi-VN");
        return (
          <div
            style={{
              textAlign: "right",
              marginRight: "32px",
            }}
          >
            {dateTime}
          </div>
        );
      },
    },
    {
      title: "Cổng check-in",
      dataIndex: "congcheckin",
      render: (port: number) => {
        return (
          <div
            style={{
              textAlign: "right",
              marginRight: "32px",
            }}
          >
            Cổng {port}
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
        Danh sách vé
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
          <Button margin="0 10px" width="128px" onClick={() => setModal(true)}>
            <span
              style={{
                display: "inline-block",
                transform: "translate(-6px, 4px)",
              }}
            >
              <FilterIcon />
            </span>
            Lọc vé
          </Button>
          <CSVLink data={dataTicketPage}>
            <Button
              width="180px"
              // onClick={() => {
              //   [...Array(29)].map((x, i) => {
              //     // const datex = new Date(2022, 4, i + 1);
              //     // addDoc(collection(db, "check"), {
              //     //   stt: i,
              //     //   sove: i + 103453432,
              //     //   tensukien: "Hội chợ triển lãm tiêu dùng 2022",
              //     //   ngaysudung: datex.getTime(),
              //     //   loaive: "Vé cổng",
              //     //   congcheckin: Math.floor(Math.random() * 5) + 1,
              //     //   doixoat: false,
              //     // });

              //     // const date = new Date(2022, 3, i + 1);
              //     // const datex = new Date(2022, 4, i + 1);
              //     // addDoc(collection(db, "ticket"), {
              //     //   stt: i,
              //     //   macode: "ABCDEF" + i,
              //     //   sove: i + 103453432,
              //     //   tinhtrangsudung: Math.floor(Math.random() * 3) - 1,
              //     //   ngaysudung: datex.getTime(),
              //     //   ngayxuatve: date.getTime(),
              //     //   congcheckin: Math.floor(Math.random() * 5) + 1,
              //     // });

              //     const date = new Date(2022, 3, i + 1);
              //     const datex = new Date(2022, 4, i + 1);
              //     addDoc(collection(db, "setting"), {
              //       stt: i,
              //       maGoi: "ABCDEF" + i,
              //       tenGoi: "AAAAAA" + i,
              //       ngayapdung: date.getTime(),
              //       ngayhethan: datex.getTime(),
              //       giave: 90000,
              //       giacombo: 360000,
              //       tinhtrang: Math.floor(Math.random() * 3) - 1,
              //     });
              //   });
              //  }}
            >
              Xuất file (.csv)
            </Button>
          </CSVLink>
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
        visible={modal}
        onOk={() => {
          const newArr1 = data.filter((item) => {
            if (status !== -2) {
              return item.tinhtrangsudung === status;
            }
            return true;
          });
          const newArr2 = newArr1.filter((item) => {
            if (check.includes(0) || check.includes(item.congcheckin))
              return true;
            return false;
          });

          const newArr3 = newArr2.filter((item) => {
            if (datefrom && dateto) {
              console.log(
                item.ngayxuatve > datefrom && item.ngayxuatve < dateto
              );
              if (item.ngayxuatve > datefrom && item.ngayxuatve < dateto)
                return true;
              return false;
            }
            return true;
          });

          console.log(newArr3);
          setDataTicketPage(newArr3);
          setModal(false);
        }}
        closeIcon={<></>}
        width="630px"
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
            display: "none",
          },
        }}
        okText="Lọc"
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <span
            style={{ fontSize: "24px", fontWeight: "600", marginTop: "-4px" }}
          >
            Lọc vé
          </span>
        </div>
        <Row>
          <Col span={11}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "opx 4px" }}>
                Từ ngày
              </span>
            </div>
            <DatePicker
              onChange={(e) => {
                e?.toDate().getTime() && setFrom(e?.toDate().getTime());
              }}
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yy"
            />
          </Col>
          <Col span={12}>
            <div style={{ marginTop: "24px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px", margin: "0px 4px" }}>
                Đến ngày
              </span>
            </div>
            <DatePicker
              onChange={(e) => {
                e?.toDate().getTime() && setTo(e?.toDate().getTime());
              }}
              style={{ height: "40px", width: "145px" }}
              placeholder="dd:mm:yyy"
            />
          </Col>
        </Row>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Tình trạng sử dụng
        </div>

        <Radio.Group onChange={(e) => setStatus(e.target.value)}>
          <Radio value={-2} style={{ width: "135px" }}>
            Tất cả
          </Radio>
          <Radio value={1} style={{ width: "135px" }}>
            Đã sử dụng
          </Radio>
          <Radio value={0} style={{ width: "135px" }}>
            Chưa sử dụng
          </Radio>
          <Radio value={-1} style={{ width: "135px" }}>
            Hết hạn
          </Radio>
        </Radio.Group>
        <div style={{ fontSize: "16px", margin: "28px 0 0 4px" }}>
          Cổng Check-in
        </div>

        <Row>
          <Col span={8}>
            <Checkbox checked={check.includes(0)} onClick={() => onClick(0)}>
              Check All
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(1)} onClick={() => onClick(1)}>
              Cổng 1
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(2)} onClick={() => onClick(2)}>
              Cổng 2
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(3)} onClick={() => onClick(3)}>
              Cổng 3
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(4)} onClick={() => onClick(4)}>
              Cổng 4
            </Checkbox>
          </Col>
          <Col span={8}>
            <Checkbox checked={check.includes(5)} onClick={() => onClick(5)}>
              Cổng 5
            </Checkbox>
          </Col>
        </Row>
      </Modal>
    </Layout.Content>
  );
};

export default Ticket;
