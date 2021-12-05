var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/* connect routes file */
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var homeRouter = require('./routes/main/home');
var reservationRouter = require('./routes/main/reservation');
var checkRouter = require('./routes/main/check');
var personalRouter = require('./routes/main/personal');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


/* route url */
app.use('/', loginRouter);
app.use('/create', signupRouter);
app.use('/main/home', homeRouter);
app.use('/main/reservation', reservationRouter);
app.use('/main/check', checkRouter);
app.use('/main/personal', personalRouter);

var router = express.Router();
const ids = ["id1", "id2", "id3", "id4", "id5"];
const pwds = ["pwd1", "pwd2", "pwd3", "pwd4", "pwd5"];

app.use(
  "/main",
  router.get("/check/:id", function (req, res) {
    res.send({
      isIdCheck: ids.includes(req.params.id) === false,
    });
  })
);

app.use(
  "/",
  router.post("/", function (req, res) {
    const { id, pwd } = req.body;
    const idx = ids.indexOf(id);

    if (idx === -1 || pwds[idx] !== pwd) {
      res.send({
        isLogin: false,
      });
      return;
    }

    res.send({
      isLogin: true,
      user: {
        id,
        name: "김이박",
        tel: "01032323232",
        address: "서울특별시 어쩌구 어쩌구",
        gender: "남자",
        age: 25,
        email: "test@naver.com",
      },
    });
  })
);

app.use(
  "/create",
  router.post("/", function (req, res) {
    res.send({
      isJoin: true,
    });
  })
);

app.use(
  "/home-data",
  router.get("/", function (_, res) {
    res.send({
      values: [20, 25, 40, 40, 66, 75, 80, 81],
      table_items: [
        {
          name: "이전실적",
          fir: 40398477,
          done: 33166098,
          plus: 5575,
        },
        {
          name: "당일누적",
          fir: 63954,
          done: 1231,
          plus: 90,
        },
        {
          name: "총 누적",
          fir: 40462431,
          done: 33167329,
          plus: 5665,
        },
      ],
      locations: [
        {
          name: "서울",
          fir: 7562468,
          done: 6194826,
          plus: 952,
        },
        {
          name: "강원도",
          fir: 1212781,
          done: 1027130,
          plus: 197,
        },
        {
          name: "경기도",
          fir: 10545235,
          done: 8451744,
          plus: 621,
        },
        {
          name: "경상도",
          fir: 2597945,
          done: 2174376,
          plus: 368,
        },
        {
          name: "전라도",
          fir: 1429176,
          done: 1211946,
          plus: 372,
        },
        {
          name: "충청도",
          fir: 1690531,
          done: 1396705,
          plus: 286,
        },
      ],
      ages: [
        {
          name: "유아~10대",
          fir: 7562468,
          done: 6194826,
          plus: 952,
        },
        {
          name: "20대",
          fir: 1212781,
          done: 1027130,
          plus: 197,
        },
        {
          name: "30대",
          fir: 10545235,
          done: 8451744,
          plus: 621,
        },
        {
          name: "40대",
          fir: 2597945,
          done: 2174376,
          plus: 368,
        },
        {
          name: "50대",
          fir: 1429176,
          done: 1211946,
          plus: 372,
        },
        {
          name: "60대",
          fir: 1690531,
          done: 1396705,
          plus: 286,
        },
        {
          name: "70대 이상",
          fir: 1690531,
          done: 1396705,
          plus: 286,
        },
      ],
    });
  })
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
