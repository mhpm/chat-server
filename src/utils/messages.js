import moment from "moment"

function formatMessage(user, msg) {
  return {
    user,
    msg,
    time: moment().format("h:mm a"),
  }
}

export default formatMessage
