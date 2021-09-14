 
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4,
} from "variables/charts.js";

function Rtl() {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };

  return (
    
    <>
    {/* <div
    style={{float:"right",width: "15px"}}
        style={{
          height: "600px",
          position: "relative",
          width: "70%",
          margin: "60px",
          marginLeft: "300px",
        }}
      >


     {/* <div id="paypal" class="tab-pane fade pt-3">
          <h6 class="pb-2">Select your paypal account type</h6>
          <div class="form-group ">
            <label class="radio-inline">
              <input type="radio" name="optradio" checked />
              Domestic
            </label>
            <label class="radio-inline">
              <input type="radio" name="optradio" class="ml-5" />
              International
            </label>
          </div>
          <p>
            {" "}
            <button type="button" class="btn btn-primary ">
              <i class="fab fa-paypal mr-2"></i> Log into my Paypal
            </button>{" "}
          </p>
          <p class="text-muted">
            {" "}
            Note: After clicking on the button, you will be directed to
            a secure gateway for payment. After completing the payment
            process, you will be redirected back to the website to view
            details of your order.{" "}
          </p>
        </div>
        <div id="net-banking" class="tab-pane fade pt-3">
          <div class="form-group ">
            {" "}
            <label for="Select Your Bank">
              <h6>Select your Bank</h6>
            </label>
            <select class="form-control" id="ccmonth">
              <option value="" selected disabled>
                --Please select your Bank--
              </option>
              <option>Bank 1</option>
              <option>Bank 2</option>
              <option>Bank 3</option>
              <option>Bank 4</option>
              <option>Bank 5</option>
              <option>Bank 6</option>
              <option>Bank 7</option>
              <option>Bank 8</option>
              <option>Bank 9</option>
              <option>Bank 10</option>
            </select>
          </div>
          <div class="form-group">
            <p>
              {" "}
              <button type="button" class="btn btn-primary ">
                <i class="fas fa-mobile-alt mr-2"></i> Proceed Payment
              </button>{" "}
            </p>
          </div>
          <p class="text-muted">
            Note: After clicking on the button, you will be directed to
            a secure gateway for payment. After completing the payment
            process, you will be redirected back to the website to view
            details of your order.{" "}
          </p>
        </div>
      
         
       <Message.ImageContent
                                    src={`${message.message_body}`}
                                    width={150}
                                    alt="avatar"
                                  ></Message.ImageContent>
      {readMessages.length > 0 &&
                          readMessages.map((read) => {
                            if (read === message.id) {
                              <img src="https://img.icons8.com/material-outlined/24/4a90e2/double-tick.png"/>
                          } else {
                            <span>there</span>
                          }
                          })}
        <MainContainer responsive>
          <Sidebar position="left" scrollable={false}>
            <ConversationList>
              <Conversation
                name="Lilly"
                lastSenderName="Lilly"
                info="Yes i can do it for you"
              >
                <Avatar src={emilyIco} name="Lilly" status="available" />
              </Conversation>

              <Conversation
                name="Joe"
                lastSenderName="Joe"
                info="Yes i can do it for you"
              >
                <Avatar src={emilyIco} name="Joe" status="dnd" />
              </Conversation>

              <Conversation
                name="Emily"
                lastSenderName="Emily"
                info="Yes i can do it for you"
                unreadCnt={3}
              >
                <Avatar src={emilyIco} name="Emily" status="available" />
              </Conversation>

              <Conversation
                name="Kai"
                lastSenderName="Kai"
                info="Yes i can do it for you"
                unreadDot
              >
                <Avatar src={emilyIco} name="Kai" status="unavailable" />
              </Conversation>

              <Conversation
                name="Akane"
                lastSenderName="Akane"
                info="Yes i can do it for you"
              >
                <Avatar src={emilyIco} name="Akane" status="eager" />
              </Conversation>

              <Conversation
                name="Eliot"
                lastSenderName="Eliot"
                info="Yes i can do it for you"
              >
                <Avatar src={emilyIco} name="Eliot" status="away" />
              </Conversation>

              <Conversation
                name="Zoe"
                lastSenderName="Zoe"
                info="Yes i can do it for you"
                active
              >
                <Avatar src={emilyIco} name="Zoe" status="dnd" />
              </Conversation>

              <Conversation
                name="Patrik"
                lastSenderName="Patrik"
                info="Yes i can do it for you"
              >
                <Avatar src={emilyIco} name="Patrik" status="invisible" />
              </Conversation>
            </ConversationList>
          </Sidebar>



           <div className="row add-card">
                <div className="col-lg-8 mx-auto">
                  <div className="card card-form">
                    <div className="card-header">
                      <div className="float-right" onClick={handleClose}>
                        X
                      </div>
                      <div className="tab-content">
                        <div
                          id="credit-card"
                          className="tab-pane fade show active pt-3"
                        >
                          <form className="submit-form">
                            <div className="shipping">
                              <div className="row2">
                                <div className="address">
                                  <label htmlFor="address">Address</label>
                                  <input className="input" type="text" />
                                </div>
                                <div className="postal-code">
                                  <label htmlFor="pin">ZIP/Postal Code</label>
                                  <input className="input" type="text" />
                                </div>
                              </div>
                              <div className="row3">
                                <div className="city">
                                  <label htmlFor="city">City</label>
                                  <input className="input" type="text" />
                                </div>
                                <div className="country">
                                  <div className="label">
                                    <label htmlFor="country">Country</label>
                                  </div>
                                  <div className="input">
                                    <input className="input" type="text" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row1-check">
                              <div className="checkbox">
                                <input className="checkbox-input"
                                  type="checkbox"
                                  name="is_default_location"
                                  value="false"
                                />
                                <label>
                                  <strong>Is Default Shipping Address?</strong>
                                </label>
                              </div>
                            </div>
                            <div className="row5">
                              <div className="button">
                                <button>Submit</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


    {/* <div className="form">
          <form>
            <div className="shipping">
              <div className="row2">
                <div className="address">
                  <label htmlFor="address">Address</label>
                  <input type="text" />
                </div>
                <div className="postal-code">
                  <label htmlFor="pin">ZIP/Postal Code</label>
                  <input type="text" />
                </div>
              </div>
              <div className="row3">
                <div className="city">
                  <label htmlFor="city">City</label>
                  <input type="text" />
                </div>
                <div className="country">
                  <div className="label">
                    <label htmlFor="country">Country</label>
                  </div>
                  <div className="input">
                    <input type="text" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row1-check">
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="is_default_location"
                  value="false"
                />
                <label>
                  <strong> Is Default Shipping Address?</strong>
                </label>
              </div>
            </div>
            {/* <div className="billing">
			<h3>Billing Address</h3>
			
			<div className="row1">
					<div className="checkbox">
						<input type="checkbox"/>	
						<label>
							<strong>Is the Billing Address the same as the Shipping Address?</strong>
						</label>
					</div>
			</div>
			<div className="row2">
				<div className="first-name"><label for="">First Name</label><input type="text"/></div>
				<div className="last-name"><label for="">Last Name</label><input type="text"/></div>
			</div>
			
			<div className="row3">
				<div className="address"><label for="">Address</label><input type="text"/></div>
				<div className="postal-code"><label for="">ZIP/Postal Code</label><input type="text"/></div>
			</div>
			
			<div className="row4">
				<div className="city"><label for="">City</label><input type="text"/></div>
				<div className="country">
					<div className="label"><label for="">Country</label>
					</div>
					<div className="input">
						<input type="text"/>
					</div>
				</div>
			</div>
		</div> 

            <div className="row5">
            
              <div className="button">
                <button>Next Step</button>
              </div>
            </div>
          </form>
        </div> 

          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={emilyIco} name="Zoe" />
              <ConversationHeader.Content
                userName="Zoe"
                info="Active 10 mins ago"
              />
              <ConversationHeader.Actions>
                <VoiceCallButton />
                <VideoCallButton />
                <InfoButton />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList
              typingIndicator={<TypingIndicator content="Zoe is typing" />}
            >
              <MessageSeparator content="Saturday, 30 November 2019" />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "single",
                }}
              >
                <Avatar src={emilyIco} name="Zoe" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "single",
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first",
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "normal",
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "normal",
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last",
                }}
              >
                <Avatar src={emilyIco} name="Zoe" />
              </Message>

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "first",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "normal",
                }}
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Patrik",
                  direction: "outgoing",
                  position: "last",
                }}
              />

              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "first",
                }}
                avatarSpacer
              />
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "15 mins ago",
                  sender: "Zoe",
                  direction: "incoming",
                  position: "last",
                }}
              >
                <Avatar src={emilyIco} name="Zoe" />
              </Message>
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onChange={(val) => setMessageInputValue(val)}
              onSend={() => setMessageInputValue("")}
            />
          </ChatContainer>
        </MainContainer>
      </div> */}
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-right" sm="6">
                    <h5 className="card-category">مجموع الشحنات</h5>
                    <CardTitle tag="h2">أداء</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-left"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          حسابات
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          المشتريات
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          جلسات
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
                        </span>
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="text-right" lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">شحنات كاملة</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-primary" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="text-right" lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">المبيعات اليومية</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-info" />{" "}
                  3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="text-right" lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">المهام المكتملة</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="text-center" lg="6" sm="6">
            <Card className="card-tasks text-left">
              <CardHeader className="text-right">
                <h6 className="title d-inline">تتبع</h6>{" "}
                <p className="card-category d-inline">اليوم</p>
                <UncontrolledDropdown className="float-left">
                  <DropdownToggle
                    aria-expanded={false}
                    aria-haspopup={true}
                    caret
                    color="link"
                    data-toggle="dropdown"
                    id="dropdownMenuLink"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                  </DropdownToggle>
                  <DropdownMenu aria-labelledby="dropdownMenuLink">
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      عمل
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      عمل آخر
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      شيء آخر هنا
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td className="text-center">
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-right">
                          <p className="title">مركز معالجة موقع محور</p>
                          <p className="text-muted">نص آخر هناالوثائق</p>
                        </td>
                        <td className="td-actions">
                          <Button
                            color="link"
                            id="tooltip591536518"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-settings" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip591536518"
                            placement="right"
                          >
                            مهمة تحرير
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-right">
                          <p className="title">لامتثال GDPR</p>
                          <p className="text-muted">
                            الناتج المحلي الإجمالي هو نظام يتطلب من الشركات
                            حماية البيانات الشخصية والخصوصية لمواطني أوروبا
                            بالنسبة للمعاملات التي تتم داخل الدول الأعضاء في
                            الاتحاد الأوروبي.
                          </p>
                        </td>
                        <td className="td-actions">
                          <Button
                            color="link"
                            id="tooltip36890049"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-settings" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip36890049"
                            placement="right"
                          >
                            مهمة تحرير
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-right">
                          <p className="title">القضاياالقضايا</p>
                          <p className="text-muted">
                            سيكونونقال 50٪ من جميع المستجيبين أنهم سيكونون أكثر
                            عرضة للتسوق في شركة
                          </p>
                        </td>
                        <td className="td-actions">
                          <Button
                            color="link"
                            id="tooltip5456779"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-settings" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip5456779"
                            placement="right"
                          >
                            مهمة تحرير
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-right">
                          <p className="title">
                            تصدير الملفات التي تمت معالجتها
                          </p>
                          <p className="text-muted">
                            كما يبين التقرير أن المستهلكين لن يغفروا شركة بسهولة
                            بمجرد حدوث خرق يعرض بياناتهم الشخصية.
                          </p>
                        </td>
                        <td className="td-actions">
                          <Button
                            color="link"
                            id="tooltip989428493"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-settings" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip989428493"
                            placement="right"
                          >
                            مهمة تحرير
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <FormGroup check>
                            <Label check>
                              <Input
                                defaultChecked
                                defaultValue=""
                                type="checkbox"
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-right">
                          <p className="title">الوصول إلى عملية التصدير</p>
                          <p className="text-muted">
                            سياسة السيء إنطلاق في قبل, مساعدة والمانيا أخذ قد.
                            بل أما أمام ماشاء الشتاء،, تكاليف الإقتصادي بـ حين.
                            ٣٠ يتعلّق للإتحاد ولم, وتم هناك مدينة بتحدّي إذ, كان
                            بل عمل
                          </p>
                        </td>
                        <td className="td-actions">
                          <Button
                            color="link"
                            id="tooltip169784793"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-settings" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip169784793"
                            placement="right"
                          >
                            مهمة تحرير
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <FormGroup check>
                            <Label check>
                              <Input defaultValue="" type="checkbox" />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td className="text-right">
                          <p className="title">الافراج عن v2.0.0</p>
                          <p className="text-muted">
                            عن رئيس طوكيو البولندي لمّ, مايو مرجع وباءت قبل هو,
                            تسمّى الطريق الإقتصادي ذات أن. لغات الإطلاق الفرنسية
                            دار ان, بين بتخصيص الساحة اقتصادية أم. و الآخ
                          </p>
                        </td>
                        <td className="td-actions">
                          <Button
                            color="link"
                            id="tooltip554497871"
                            title=""
                            type="button"
                          >
                            <i className="tim-icons icon-settings" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip554497871"
                            placement="right"
                          >
                            مهمة تحرير
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card>
              <CardHeader className="text-right">
                <CardTitle tag="h4">جدول بسيط</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>اسم</th>
                      <th>بلد</th>
                      <th>مدينة</th>
                      <th className="text-center">راتب</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>رايس داكوتا</td>
                      <td>النيجر</td>
                      <td>العود-تورنهاوت</td>
                      <td className="text-center">$36,738</td>
                    </tr>
                    <tr>
                      <td>مينيرفا هوبر</td>
                      <td>كوراساو</td>
                      <td>Sinaai-واس</td>
                      <td className="text-center">$23,789</td>
                    </tr>
                    <tr>
                      <td>سيج رودريجيز</td>
                      <td>هولندا</td>
                      <td>بايلي</td>
                      <td className="text-center">$56,142</td>
                    </tr>
                    <tr>
                      <td>فيليب شانيه</td>
                      <td>كوريا، جنوب</td>
                      <td>اوفرلاند بارك</td>
                      <td className="text-center">$38,735</td>
                    </tr>
                    <tr>
                      <td>دوريس غرين</td>
                      <td>مالاوي</td>
                      <td>المنع</td>
                      <td className="text-center">$63,542</td>
                    </tr>
                    <tr>
                      <td>ميسون بورتر</td>
                      <td>تشيلي</td>
                      <td>غلوستر</td>
                      <td className="text-center">$78,615</td>
                    </tr>
                    <tr>
                      <td>جون بورتر</td>
                      <td>البرتغال</td>
                      <td>غلوستر</td>
                      <td className="text-center">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Rtl;
