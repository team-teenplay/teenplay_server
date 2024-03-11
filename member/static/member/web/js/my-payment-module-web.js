const payService = (() => {
        const getList = async (member_id, page, callback) => {
        const response = await fetch(`/member/mypage-payment/${member_id}/${page}/`);
        const pay = await response.json();
        if(callback){
            return callback(pay)
        }
        return pay
            ;}

        const remove = async (pay_id) => {
        await fetch(`/member/mypage-payment/${pay_id}/`, {
            method: 'delete',
            headers: {'X-CSRFToken': csrf_Token}
        });
        }

    return {getList:getList, remove:remove}
})();
















