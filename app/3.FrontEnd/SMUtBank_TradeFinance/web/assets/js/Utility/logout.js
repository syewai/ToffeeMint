/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function logout() {
    sessionStorage.clear();
    window.location.replace("/SMUtBank_TradeFinance/login.html");
}