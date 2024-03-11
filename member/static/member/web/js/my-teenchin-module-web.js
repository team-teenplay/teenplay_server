const teenchinService = (() => {
        const getList = async (member_id, page, callback) => {
        const response = await fetch(`/member/mypage-teenchin/${member_id}/${page}/`);
        const teenchin = await response.json();
        if(teenchin){
            return callback(teenchin)
        }
        return teenchin
            ;}


    return {getList:getList}
})();
















