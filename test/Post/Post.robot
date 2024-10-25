*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app

${Delay}    1s



*** Keywords ***

login check


    Click Button    id=login-button
    Wait Until Element Is Visible  xpath=//div[@id='login-form']/div  10s 
    Input Text      name=identifier    WOJA2
    Click Button   id=loginPassword
    Input Text      name=loginPassword   111111 
    Click Button    id=login-submit-button
   # Wait Until Page Contains  เข้าสู่ระบบสำเร็จ  10s
    
    
Check text Tc9001
    Wait Until Page Contains  สร้างโพสต์สำเร็จ!
    sleep    ${Delay}

    Capture Page Screenshot  Photo/Viwearticle/TC9001.png

Check text Tc9002
    Page Should Contain  ไม่กรอก Game name
    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC9002.png


Check text Tc9003
    Page Should Contain  ไม่กรอก Number of people

    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC9003.png

Check text Tc9004
    Page Should Contain  ไม่เลือก Date
    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC9004.png


Check text Tc9005
    Page Should Contain  ไม่เลือก Time
    sleep    ${Delay}
    Capture Page Screenshot  Photo/Viwearticle/TC9005.png



*** Test Cases ***
TC9001 สร้างโพสต์นัดเล่น

    Open Browser    ${URL}    ${Browser}

    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    id=post-box      10s
    Click Element                    id=post-box
    #
    Wait Until Element Is Visible    id=game-select  10s
    Click Element                    id=game-select 
    Wait Until Element Is Visible    id=game-autocomplete-option-0  10s
    Click Element                    id=game-autocomplete-option-0
    #Input Text    id=game-select     คำต้องห้าม
    #Press Key    id=game-select    คำต้องห้าม
    Wait Until Element Is Visible   id=detail-post-input
    Click Element                    id=detail-post-input
    Input Text      name=detail_post     ไม่จำเป็นต้องรู้จักกฏของเกมก่อน มาเล่นๆเอ็นจอยกัน
    Wait Until Element Is Visible     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button  10s
    Click Element                     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button
    Click Button          xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[5]/button[5]
    #เวลา
    Wait Until Element Is Visible    xpath=//*[@id="date-time-picker"]/div[2]/div    20s
    sleep    ${Delay}
    Click Element        xpath=//*[@id="date-time-picker"]/div[2]/div/div/button
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

    #Input Text    xpath=//*[@id=":rs:"]/li[8]    
    #ใส่รูป
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    #Click Element  xpath=//*[@id="upload-button"]
    #Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #Wait Until Element Is Visible  xpath=//*[@id="image-input"]  30s
    #Input Text     xpath=//*[@id="image-input"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #สร้างโพส
    Click Button  id=create-post-button
    sleep    ${Delay}
    Check text Tc9001
    Close Browser


TC9002 สร้างโพสต์นัดเล่นไม่กรอก Game name

    Open Browser    ${URL}    ${Browser}

    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    id=post-box      10s
    Click Element                    id=post-box
    #Wait Until Element Is Visible    id=game-select  10s
    #Click Element                    id=game-select 
    #Input Text    id=game-select     คำต้องห้าม
    #Press Key    id=game-select    คำต้องห้าม
    Wait Until Element Is Visible   id=detail-post-input
    Click Element                    id=detail-post-input
    Input Text      name=detail_post     ไม่จำเป็นต้องรู้จักกฏของเกมก่อน มาเล่นๆเอ็นจอยกัน
    #วัน
    Wait Until Element Is Visible     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button  10s
    Click Element                     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button
    Click Button          xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[5]/button[5]
    #เวลา
    Wait Until Element Is Visible    xpath=//*[@id="date-time-picker"]/div[2]/div    20s
    sleep    ${Delay}
    Click Element        xpath=//*[@id="date-time-picker"]/div[2]/div/div/button
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

    #Input Text    xpath=//*[@id=":rs:"]/li[8]    
    #ใส่รูป
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    #Click Element  xpath=//*[@id="upload-button"]
    #Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    sleep    ${Delay}

    Click Button  id=create-post-button
    Check text Tc9002
    Close Browser


TC9003 สร้างโพสต์นัดเล่น ไม่กรอกคนเล่น

    Open Browser    ${URL}    ${Browser}

    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    id=post-box      10s
    Click Element                    id=post-box
    #คลิ๊กเลือกชื่อเกม
    Wait Until Element Is Visible    id=game-select  10s
    Click Element                    id=game-select 
    Wait Until Element Is Visible    id=game-autocomplete-option-0  10s
    Click Element                    id=game-autocomplete-option-0
    #Input Text    id=game-select     คำต้องห้าม
    #Press Key    id=game-select    คำต้องห้าม
    Wait Until Element Is Visible   id=detail-post-input
    Click Element                    id=detail-post-input
    Input Text      name=detail_post     ไม่จำเป็นต้องรู้จักกฏของเกมก่อน มาเล่นๆเอ็นจอยกัน
    Wait Until Element Is Visible     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button  10s
    Click Element                     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button
    Click Button          xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[5]/button[5]
    #เวลา
    Wait Until Element Is Visible    xpath=//*[@id="date-time-picker"]/div[2]/div    20s
    sleep    ${Delay}
    Click Element        xpath=//*[@id="date-time-picker"]/div[2]/div/div/button
    Click Element        xpath=/html/body/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]
    sleep    ${Delay}
    Wait Until Element Is Visible     xpath=/html/body/div[2]/div[2]/div/div[2]/button    10
    Click Element        xpath=/html/body/div[2]/div[2]/div/div[2]/button
    #จำนวนผู้เล่น
    sleep    ${Delay}
    

    #Input Text    xpath=//*[@id=":rs:"]/li[8]    
    #ใส่รูป
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    #Click Element  xpath=//*[@id="upload-button"]
    #Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #Wait Until Element Is Visible  xpath=//*[@id="image-input"]  30s
    #Input Text     xpath=//*[@id="image-input"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #สร้างโพส
    Click Button  id=create-post-button
    sleep    ${Delay}
    Check text Tc9003
    Close Browser



TC9005 Date

    Open Browser    ${URL}    ${Browser}

    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    id=post-box      10s
    Click Element                    id=post-box
    #คลิ๊กเลือกชื่อเกม
    Wait Until Element Is Visible    id=game-select  10s
    Click Element                    id=game-select 
    Wait Until Element Is Visible    id=game-autocomplete-option-0  10s
    Click Element                    id=game-autocomplete-option-0
    #Input Text    id=game-select     คำต้องห้าม
    #Press Key    id=game-select    คำต้องห้าม
    Wait Until Element Is Visible   id=detail-post-input
    Click Element                    id=detail-post-input
    Input Text      name=detail_post     ไม่จำเป็นต้องรู้จักกฏของเกมก่อน มาเล่นๆเอ็นจอยกัน
    #วัน
   
    #เวลา
    Wait Until Element Is Visible    xpath=//*[@id="date-time-picker"]/div[2]/div    20s
    sleep    ${Delay}
    Click Element        xpath=//*[@id="date-time-picker"]/div[2]/div/div/button
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

    #Input Text    xpath=//*[@id=":rs:"]/li[8]    
    #ใส่รูป
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    #Click Element  xpath=//*[@id="upload-button"]
    #Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #Wait Until Element Is Visible  xpath=//*[@id="image-input"]  30s
    #Input Text     xpath=//*[@id="image-input"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #สร้างโพส
    
    Click Button  id=create-post-button
    sleep    ${Delay}
    Check text Tc9004
    Close Browser

TC9006 Time

    Open Browser    ${URL}    ${Browser}

    login check
    sleep    ${Delay}
    Wait Until Element Is Visible    id=post-box      10s
    Click Element                    id=post-box
    #คลิ๊กเลือกชื่อเกม
    Wait Until Element Is Visible    id=game-select  10s
    Click Element                    id=game-select 
    Wait Until Element Is Visible    id=game-autocomplete-option-0  10s
    Click Element                    id=game-autocomplete-option-0
    #Input Text    id=game-select     คำต้องห้าม
    #Press Key    id=game-select    คำต้องห้าม
    Wait Until Element Is Visible   id=detail-post-input
    Click Element                    id=detail-post-input
    Input Text      name=detail_post     ไม่จำเป็นต้องรู้จักกฏของเกมก่อน มาเล่นๆเอ็นจอยกัน
    Wait Until Element Is Visible     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button  10s
    Click Element                     xpath=//*[@id="date-time-picker"]/div[1]/div/div/button
    Click Button          xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[5]/button[5]
    #เวลา
    
    #จำนวนผู้เล่น
    sleep    ${Delay}
    Wait Until Element Is Visible  xpath=//*[@id="create-post-card"]/div/form/div[4]  30s
    Click Element    xpath=//*[@id="create-post-card"]/div/form/div[4]
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[3]/ul/li[12]  30s
    Click Element      xpath=/html/body/div[2]/div[3]/ul/li[12]

    #Input Text    xpath=//*[@id=":rs:"]/li[8]    
    #ใส่รูป
    Wait Until Element Is Visible  xpath=//*[@id="upload-button"]  60s
    #Click Element  xpath=//*[@id="upload-button"]
    #Choose File  xpath=//*[@id="upload-button"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #Wait Until Element Is Visible  xpath=//*[@id="image-input"]  30s
    #Input Text     xpath=//*[@id="image-input"]   /Users/macbook/Desktop/คำต้องห้าม.jpeg 
    #สร้างโพส
    Click Button  id=create-post-button
    sleep    ${Delay}
    Check text Tc9005
    Close Browser


