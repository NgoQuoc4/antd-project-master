import {
  Col,
  DatePicker,
  Layout,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Search from "../common/Search";
import moment from "moment";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

interface Props {
  setTagIndex: React.Dispatch<React.SetStateAction<string>>;
}

const Check = ({ setTagIndex }: Props) => {
  const [dataTicketPage, setDataTicketPage] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setTagIndex("check");
    const data = async () => {
      const ticket = await getDocs(collection(db, "check"));
      const ticketData = ticket.docs.map((item: any) => {
        return {
          ...item.data(),
          id: item.id,
        };
      });
      setDataTicketPage(ticketData.sort((a: any, b: any) => a.stt - b.stt));
      setData(ticketData.sort((a: any, b: any) => a.stt - b.stt));
    };
    data();
  }, [setTagIndex]);
  const [datefrom, setFrom] = useState(0);
  const [dateto, setTo] = useState(0);
  const [value, setValue] = useState(2);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (stt: string) => {
        return <div>{stt}</div>;
      },
    },
    {
      title: () => <div style={{}}>Số vé</div>,
      dataIndex: "sove",
      render: (code: string) => {
        return <div style={{}}>{code}</div>;
      },
    },
    {
      title: () => <div style={{}}>Tên sự kiện</div>,
      dataIndex: "tensukien",
      render: (name: string) => {
        return <div style={{}}>{name}</div>;
      },
    },
    {
      title: () => (
        <div
          style={{
            textAlign: "right",
          }}
        >
          Ngày sử dụng
        </div>
      ),
      dataIndex: "ngaysudung",
      render: (date: string) => {
        const dateTIme = new Date(date).toLocaleDateString("vi-VN");
        return (
          <div
            style={{
              textAlign: "right",
            }}
          >
            {dateTIme}
          </div>
        );
      },
    },

    {
      title: "Loại vé",
      dataIndex: "loaive",
      render: (type: string) => {
        return <div>{type}</div>;
      },
    },
    {
      title: "Cổng check-in",
      dataIndex: "congcheckin",
      render: (port: string) => {
        return <div>Cổng {port}</div>;
      },
    },
    {
      title: "",
      dataIndex: "doixoat",
      render: (status: boolean) => {
        return (
          <div
            style={{
              color: status ? "#FD5959" : "#A5A8B1",
              fontWeight: "500",
            }}
          >
            {status === false ? "Chưa đổi xoát" : "Đã đổi xoát"}
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Layout.Content
        style={{
          borderRadius: "24px",
          maxWidth: "1097px",
          minHeight: "963px",
          backgroundColor: "white",
          padding: "28px",
          marginRight: "32px",
        }}
      >
        <Typography.Title
          style={{ marginBottom: "46px", fontSize: "36px", fontWeight: "700" }}
        >
          Đối soát vé
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
            <Button
              margin="0 10px"
              width="170px"
              type="primary"
              onClick={() => {
                setDataTicketPage(
                  data.map((item) => {
                    return {
                      ...item,
                      doixoat: true,
                    };
                  })
                );
              }}
            >
              Chốt đối xoát
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
      </Layout.Content>
      <Layout.Content
        style={{
          borderRadius: "24px",
          minWidth: "446px",
          minHeight: "963px",
          backgroundColor: "white",
          padding: "34px 24.5px",
        }}
      >
        <Typography.Title
          style={{
            marginTop: "-12px",
            marginBottom: "32px",
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Lọc vé
        </Typography.Title>
        <Select
          showSearch
          size="large"
          style={{ width: "100%", marginBottom: "20px" }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option!.children as unknown as string).includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string)
              .toLowerCase()
              .localeCompare(
                (optionB!.children as unknown as string).toLowerCase()
              )
          }
        ></Select>
        <Row>
          <Col span={11} style={{ fontSize: "16px" }}>
            Tình trạng đối soát
          </Col>
          <Col span={11}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={2} style={{ display: "block" }}>
                Tất cả
              </Radio>
              <Radio value={1} style={{ display: "block" }}>
                Đã đối soát
              </Radio>
              <Radio value={0} style={{ display: "block" }}>
                Chưa đối soát
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row style={{ marginTop: "40px" }}>
          <Col span={11} style={{ fontSize: "16px" }}>
            Loại vé
          </Col>
          <Col span={11}>Vé cổng</Col>
        </Row>
        <Row style={{ marginTop: "24px" }}>
          <Col span={11} style={{ fontSize: "16px" }}>
            Từ ngày
          </Col>
          <Col span={11}>
            <DatePicker
              style={{ height: "40px", marginTop: "-6px", width: "100%" }}
              defaultValue={moment("2021/05/01", "DD/MM/YYYY")}
              format={"DD/MM/YYYY"}
              onChange={(e) => {
                e?.toDate().getTime() && setFrom(e?.toDate().getTime());
              }}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "30px" }}>
          <Col span={11} style={{ fontSize: "16px" }}>
            Đến ngày
          </Col>
          <Col span={11}>
            <DatePicker
              style={{ height: "40px", marginTop: "-6px", width: "100%" }}
              placeholder="dd/mm/yyy"
              format={"DD/MM/YYYY"}
              onChange={(e) =>
                e?.toDate().getTime() && setTo(e?.toDate().getTime())
              }
            />
          </Col>
        </Row>
        <Row style={{ margin: "32px auto" }}>
          <Button
            margin="0 auto"
            onClick={() => {
              const newData = data.filter((item) => {
                if (value === 2) {
                  return true;
                } else {
                  if (value === 1) {
                    return item.doixoat === true;
                  }
                  if (value === 0) {
                    return item.doixoat === false;
                  }
                }
              });
              const newData1 = newData.filter((item) => {
                if (datefrom && dateto) {
                  return (
                    item.ngaysudung >= datefrom && item.ngaysudung <= dateto
                  );
                } else {
                  return true;
                }
              });
              setDataTicketPage(newData1);
            }}
          >
            Lọc
          </Button>
        </Row>
      </Layout.Content>
    </div>
  );
};

export default Check;
