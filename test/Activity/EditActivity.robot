*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}    https://dicedreams-eta.vercel.app/sign-in
${Delay}    1s



*** Keywords ***
loginStore
   # Wait Until Element Is Visible    xpath=(//a[contains(@href, '/sign-in')])[2]
    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s
    Input Text      name=identifier   Outcast
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111
    Click Button    id=login-submit-button

Check Title blog
    Wait Until Page Contains    Changes saved successfully!
    Sleep    1


*** Test Cases ***
Search Google
    Open Browser    ${URL}    ${Browser}
    loginStore
    Click Button    locator
    Click Button    locator
    Click Button    locator
    Click Button   id=name_activity
    Input Text      name=name_activity  Board Game Night
    Click Button   id=status_post
    Input Text      name=status_post  active
    Click Button   id=creation_date
    Input Text      name=creation_date  07/13/2024 02:50:00
    Click Button   id=detail_post
    Input Text      name=detail_post  มาร่วมสนุกกับเกมกระดานยามค่ำคืนกับเรา
    Click Button   id=date_activity
    Input Text      name=date_activity  07/13/2024
    Click Button   id=time_activity
    Input Text      name=time_activity  18:00:00
    Click Button   id=post_activity_image
    Input Text      name=post_activity_image  1cd2498d-07fa-4ea5-83ef-c71781bc8cdf.jpeg
    Click Button     -
    Page Should Contain    คุณได้ทำการสร้างโพสต์กิจกรรมสำเร็จแล้ว
    Capture Page Screenshot    
    Close Browser






    # เลื่อนหน้าจอไปยัง Element และคลิก
    # Scroll Element Into View    xpath=//*[@id="Create-PostActivity"]
    # Click Element    xpath=//*[@id="Create-PostActivity"]
    Wait Until Element Is Visible    xpath=//*[@id="detail-post-input"]
    Click Element    xpath=//*[@id="detail-post-input"]
    Input Text    xpath=//*[@id="detail-post-input"]   กิจกรรมนี้เราจะแบ่งเป็น3โต๊ะ แต่ละโต๊ะจะเป็นเถมคนละประเภท โต๊ะ1เกมคำต้องเชื่อม โต๊ะ2หมาป่า โต๊ะ3เหมียวระเบิด
    #ปุ่มวันที่
    Wait Until Element Is Visible    xpath=//*[@id="date-time-picker"]/div[1]/div/div/button
    Click Element    xpath=//*[@id="date-time-picker"]/div[1]/div/div/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[5]/button[5]
    #ปุ่มเวลา
    Wait Until Element Is Visible    xpath=//*[@id="date-time-picker"]/div[2]/div/div/button
    Click Element    xpath=//*[@id="date-time-picker"]/div[2]/div/div/button
    sleep    ${Delay}
    Click Element        xpath=/html/body/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]
    sleep    ${Delay}
    Wait Until Element Is Visible     xpath=/html/body/div[2]/div[2]/div/div[2]/button    10
    Click Element        xpath=/html/body/div[2]/div[2]/div/div[2]/button
    #จำนวนผู้เล่น
    sleep    ${Delay}
    Wait Until Element Is Visible  xpath=//*[@id="create-post-card"]/div/form/div[4]  30s
    Click Element    xpath=//*[@id="create-post-card"]/div/form/div[4]
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/ul/li[12]  30s
    Click Element      xpath=/html/body/div[2]/div[3]/ul/li[12]
    #ใส่รูป
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    Click Element  xpath=//*[@id="upload-button"]
    Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #บันทึก
    Wait Until Element Is Visible    id=create-post-button
    Click Element      id=create-post-button
    
    
