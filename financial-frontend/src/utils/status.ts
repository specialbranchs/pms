export const status = (id: number) => {
    let vr = {
        color: '',
        statusTxt: ""
    }
    if (id === 1) {
        vr.color = 'green'
        vr.statusTxt = "Approved"
    } else if (id === 2) {
        vr.color = 'blue'
        vr.statusTxt = "Pending"
    } else if (id === 3) {
        vr.color = 'red'
        vr.statusTxt = "rejected"
    }
    else if (id === 4) {
        vr.color = '#9c27b0'
        vr.statusTxt = "completed"
    }
    return vr
}