import React, { useState } from "react";

export default function Info(props) {
  const [user, setUser] = useState({
    email: props.location.state.email,
    password: props.location.state.password,
    username: props.location.state.username,
    tdee: 0,
    goalCal: 0,
    goal: 0,
    index: 0,
    neat: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    sugar: 0,
    height: 0,
    weight: 0,
    age: 0,
    male: false,
    female: false,
    daysOfWorkout: 0,
    durationOfWorkout: 0,
    ecto: false,
    meso: false,
    endo: false,
    lose: false,
    gain: false,
    maintain: false,
    lowCarbs: false,
    moderateCarbs: false,
    highCarbs: false,
  });

  const [errMsg, setErrMsg] = useState("");

  const ratios = [
    {
      name: "high-carbs for bodybuilding",
      carbs: 50, // 40-60
      protein: 30, // 25-35
      fat: 20, // 15-25
    },
    {
      name: "moderate-carbs for maintenance",
      carbs: 40, // 30-50
      protein: 30, // 25-35
      fat: 30, // 25-35
    },
    {
      name: "low-carbs for reduction",
      carbs: 20, // 10-20
      protein: 50, // 40-50
      fat: 30, // 30-40
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let result =
      9.99 * parseFloat(user.weight) +
      6.25 * parseFloat(user.height) -
      4.92 * parseFloat(user.age);

    let BMR = Math.floor(user.male ? result + 5 : result - 161);

    let percentOfBMR = Math.floor((7 * BMR) / 100);

    let EPOC = parseFloat(user.daysOfWorkout) * percentOfBMR;

    let TEA = Math.floor(
      (parseFloat(user.daysOfWorkout) * parseFloat(user.durationOfWorkout) * 9 +
        EPOC) /
        7
    );

    let total = BMR + TEA + user.neat;

    let TEF = Math.floor(total / 10);

    let TDEE = total + TEF;

    let GoalCal = TDEE + user.goal;

    let protein = Math.floor((TDEE * ratios[user.index].protein) / 100 / 4);
    let carbs = Math.floor((TDEE * ratios[user.index].carbs) / 100 / 4);
    let fat = Math.floor((TDEE * ratios[user.index].fat) / 100 / 9);
    let sugar;
    user.male ? (sugar = 37.5) : (sugar = 25);

    if (TDEE > 0) {
      console.log(TDEE, GoalCal, protein, carbs, fat, sugar);
      fetch("https://yummydb-api.herokuapp.com/create-account", {
        method: "POST",
        body: JSON.stringify({
          ...user,
          tdee: TDEE,
          protein: protein,
          carbs: carbs,
          fat: fat,
          sugar: sugar,
          goalCal: GoalCal,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      props.history.push({
        pathname: "/login",
        state: {
          email: props.location.state.email,
          password: props.location.state.password,
        },
      });
    } else {
      setErrMsg("some fields are missing");
    }
  };

  return (
    <div>
      <form style={{ paddingBottom: "30px" }} onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ width: "350px", margin: "40px 65px 0 65px" }}>
            <h1>Body Type and Measurements</h1>
            <div style={{ padding: "5px" }}>Height:</div>
            <input
              className="userInfo"
              type="number"
              onChange={(e) => setUser({ ...user, height: e.target.value })}
              value={user.height}
              placeholder="Height (cm)"
              style={{ padding: "3px" }}
            />
            <div style={{ padding: "10px 5px 5px 5px" }}>Weight:</div>
            <input
              className="userInfo"
              type="number"
              onChange={(e) => setUser({ ...user, weight: e.target.value })}
              value={user.weight}
              placeholder="Weight (kg)"
              style={{ padding: "3px" }}
            />
            <div style={{ padding: "10px 5px 5px 5px" }}>Age:</div>
            <input
              className="userInfo"
              type="number"
              onChange={(e) => setUser({ ...user, age: e.target.value })}
              value={user.age}
              placeholder="Age (year)"
              style={{ padding: "3px" }}
            />
            <div
              style={{
                width: "200px",
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 5px 5px 5px",
              }}
            >
              <div>
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      male: e.target.checked,
                      female: !e.target.checked,
                    })
                  }
                />
                <label htmlFor="male">
                  <span>
                    <span></span>
                  </span>
                  male
                </label>
              </div>
              <div>
                <input
                  id="female"
                  type="radio"
                  name="gender"
                  onChange={(e) =>
                    setUser({
                      ...user,
                      female: e.target.checked,
                      male: !e.target.checked,
                    })
                  }
                />
                <label htmlFor="female">
                  <span>
                    <span></span>
                  </span>
                  female
                </label>
              </div>
            </div>
            <h1>Body Type:</h1>

            <input
              id="ecto"
              type="radio"
              name="bodyType"
              onChange={(e) =>
                setUser({
                  ...user,
                  ecto: e.target.checked,
                  endo: !e.target.checked,
                  meso: !e.target.checked,
                  neat: 900,
                })
              }
            />
            <label htmlFor="ecto">
              <span>
                <span></span>
              </span>
              Ectomorph
            </label>
            <p
              style={{
                fontSize: "14px",
                textAlign: "start",
                margin: "0 0 15px 20px",
              }}
            >
              * struggles to gain weight
            </p>

            <input
              id="meso"
              type="radio"
              name="bodyType"
              onChange={(e) =>
                setUser({
                  ...user,
                  ecto: !e.target.checked,
                  endo: !e.target.checked,
                  meso: e.target.checked,
                  neat: 500,
                })
              }
            />
            <label htmlFor="meso">
              <span>
                <span></span>
              </span>
              Mesomorph
            </label>
            <p
              style={{
                fontSize: "14px",
                textAlign: "start",
                margin: "0 0 15px 20px",
              }}
            >
              * easily gains and loses weight
            </p>

            <input
              id="endo"
              type="radio"
              name="bodyType"
              onChange={(e) =>
                setUser({
                  ...user,
                  ecto: !e.target.checked,
                  endo: e.target.checked,
                  meso: !e.target.checked,
                  neat: 400,
                })
              }
            />
            <label htmlFor="endo">
              <span>
                <span></span>
              </span>
              Endomorph
            </label>
            <p
              style={{
                fontSize: "14px",
                margin: "0 0 15px 20px",
                textAlign: "start",
              }}
            >
              * easily gains weight, struggles to lose weight
            </p>
          </div>
          <div style={{ width: "350px", margin: "40px 65px" }}>
            <h1>Workout & Sport</h1>
            <div>
              <p style={{ margin: "5px 0", textAlign: "start" }}>
                Days of Workout per Week:
              </p>
              <input
                min="0"
                className="userInfo"
                type="number"
                onChange={(e) =>
                  setUser({ ...user, daysOfWorkout: e.target.value })
                }
                value={user.daysOfWorkout}
                style={{
                  width: "80px",
                  textAlign: "center",
                  marginRight: "10px",
                }}
              />
              day(s)
            </div>
            <div>
              <p style={{ margin: "15px 0 5px 0", textAlign: "start" }}>
                Duration of Workout:
              </p>
              <input
                min="0"
                className="userInfo"
                type="number"
                onChange={(e) =>
                  setUser({ ...user, durationOfWorkout: e.target.value })
                }
                value={user.durationOfWorkout}
                style={{
                  width: "80px",
                  textAlign: "center",
                  marginRight: "10px",
                }}
              />
              minutes
            </div>
            <h1 style={{ marginTop: "15px" }}>Set a Goal:</h1>
            <div style={{ height: "30px" }}>
              <input
                id="gain"
                type="radio"
                name="goal"
                onChange={(e) =>
                  setUser({
                    ...user,
                    gain: e.target.checked,
                    lose: !e.target.checked,
                    maintain: !e.target.checked,
                    goal: 500,
                  })
                }
              />
              <label htmlFor="gain">
                <span>
                  <span></span>
                </span>
                gain muscles/ bulk
              </label>
            </div>
            <div style={{ height: "30px" }}>
              <input
                id="lose"
                type="radio"
                name="goal"
                onChange={(e) =>
                  setUser({
                    ...user,
                    gain: !e.target.checked,
                    lose: e.target.checked,
                    maintain: !e.target.checked,
                    goal: -500,
                  })
                }
              />
              <label htmlFor="lose">
                <span>
                  <span></span>
                </span>
                lose weight/ cut
              </label>
            </div>
            <div style={{ height: "30px" }}>
              <input
                id="maintain"
                type="radio"
                name="goal"
                onChange={(e) =>
                  setUser({
                    ...user,
                    gain: !e.target.checked,
                    lose: !e.target.checked,
                    maintain: e.target.checked,
                    goal: 0,
                  })
                }
              />
              <label htmlFor="maintain">
                <span>
                  <span></span>
                </span>
                maintain your current weight
              </label>
            </div>
            <h1 style={{ marginTop: "15px" }}>Choose a Diet:</h1>
            <div style={{ height: "30px" }}>
              <input
                id="low"
                type="radio"
                name="diet"
                onChange={(e) =>
                  setUser({
                    ...user,
                    lowCarbs: e.target.checked,
                    highCarbs: !e.target.checked,
                    moderateCarbs: !e.target.checked,
                    index: 2,
                  })
                }
              />
              <label htmlFor="low">
                <span>
                  <span></span>
                </span>
                low-carbs
              </label>

              {user.lose && (
                <span
                  style={{
                    backgroundColor: "#7dbf37",
                    color: "#fff",
                    padding: "2px 5px",
                    marginLeft: "10px",
                    borderRadius: "5px",
                  }}
                >
                  recommended
                </span>
              )}
            </div>
            <div style={{ height: "30px" }}>
              <input
                id="moderate"
                type="radio"
                name="diet"
                onChange={(e) =>
                  setUser({
                    ...user,
                    lowCarbs: !e.target.checked,
                    highCarbs: !e.target.checked,
                    moderateCarbs: e.target.checked,
                    index: 1,
                  })
                }
              />
              <label htmlFor="moderate">
                <span>
                  <span></span>
                </span>
                moderate-carbs
              </label>

              {user.maintain && (
                <span
                  style={{
                    backgroundColor: "#7dbf37",
                    color: "#fff",
                    padding: "2px 5px",
                    marginLeft: "10px",
                    borderRadius: "5px",
                  }}
                >
                  recommended
                </span>
              )}
            </div>
            <div style={{ height: "30px" }}>
              <input
                id="high"
                type="radio"
                name="diet"
                onChange={(e) =>
                  setUser({
                    ...user,
                    lowCarbs: !e.target.checked,
                    highCarbs: e.target.checked,
                    moderateCarbs: !e.target.checked,
                    index: 0,
                  })
                }
              />
              <label htmlFor="high">
                <span>
                  <span></span>
                </span>
                high-carbs
              </label>

              {user.gain && (
                <span
                  style={{
                    backgroundColor: "#7dbf37",
                    color: "#fff",
                    padding: "2px 5px",
                    marginLeft: "10px",
                    borderRadius: "5px",
                  }}
                >
                  recommended
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            height: "30px",
            color: "#F94F72",
            width: "100%",
            textAlign: "center",
          }}
        >
          {errMsg}
        </div>
        <div style={{ textAlign: "center" }}>
          <button className="bbtn">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
