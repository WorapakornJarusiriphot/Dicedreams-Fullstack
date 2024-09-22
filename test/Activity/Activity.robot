*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-eta.vercel.app/sign-in
${Delay}    1s



*** Keywords ***
loginStore
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Execute Javascript    document.getElementById('identifier').click()
    Input Text   xpath=//*[@id="identifier"]  outcast
    Wait Until Element Is Visible    xpath=//*[@id="password-label"]    10s
    Execute JavaScript    document.getElementById("password").click()
    Input Text      name=password   111111 
    Click Button    xpath=/html/body/main/div/form/button


*** Test Cases ***
TC1601สร้างโพสต์กิจกรรม 
    Open Browser    ${URL}    ${Browser}
    loginStore
    sleep    ${Delay}
    Wait Until Element Is Visible    xpath=//*[@id="Create-PostActivity"]    timeout=30s
    # เลื่อนหน้าจอไปยัง Element และคลิก
    Scroll Element Into View    xpath=//*[@id="Create-PostActivity"]
    Click Element    xpath=//*[@id="Create-PostActivity"]
    sleep    ${Delay}
    Click Button    xpath=//*[@id="name_activity"]
    Input Text    xpath=//*[@id="name_activity"]    กิจกรรมแข่งเล่นเกมกับทางร้านชนะรับรางวัล
    Wait Until Element Is Visible    xpath=//*[@id="detail_post"]
    Click Element    xpath=//*[@id="detail_post"]
    Input Text    xpath=//*[@id="detail_post"]    กิจกรรมนี้เราจะแบ่งเป็น3โต๊ะ แต่ละโต๊ะจะเป็นเถมคนละประเภท โต๊ะ1เกมคำต้องเชื่อม โต๊ะ2หมาป่า โต๊ะ3เหมียวระเบิด
    #ปุ่มวันที่
    Click Button    xpath=//*[@id=":Rd6jhkn9uuja:"]
    Click Button    xpath=/html/body/main/div/form/div[1]/div[3]/div/div[1]/div/div/div/button
    Click Button    xpath=/html/body/div[3]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[4]/button[5]
    #ปุ่มเวลา
    Click Button    xpath=//*[@id=":Rdajhkn9uuja:"]
    Click Button    xpath=/html/body/main/div/form/div[1]/div[3]/div/div[2]/div/div/div/button
    Click Button    xpath=/html/body/div[3]/div[2]/div/div[1]/div/div[1]/button[2]
    Click Button    xpath=/html/body/div[3]/div[2]/div/div[2]/button
    sleep    ${Delay}
    Click Button     xpath=//*[@id="post_activity_image"]/input
    Close Browser