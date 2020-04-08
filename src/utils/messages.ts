import moment from 'moment'

function formatMessage(user:string, msg:string) {
  return {
    user,
    msg,
    time: moment().format("h:mm a")
  }
}

export default formatMessage
