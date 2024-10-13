*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${Browser}  chrome
${URL}   https://dicedreams-font-end.vercel.app/
${Delay}    1s



*** Keywords ***
 Check Title blog register 
    Wait Until Page Contains  ลงทะเบียนสำเร็จ  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2001.png

 Check Title blog register1
    Wait Until Page Contains  ไม่กรอก First Name  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2002.png

 Check Title blog register2
    Wait Until Page Contains  ไม่กรอก Last Name  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2003.png

 Check Title blog register3
    Wait Until Page Contains  ไม่กรอก Username  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2004.png

 Check Title blog register4
    Wait Until Page Contains  ไม่กรอก Telephone Number  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2005.png

 Check Title blog register5
    Wait Until Page Contains  ไม่กรอก E-mail  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2006.png

 Check Title blog register6
    Wait Until Page Contains  ไม่กรอก Password 10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2007.png

 Check Title blog register7
    Wait Until Page Contains  คุณต้องมีอายุอย่างน้อย 12 ปีเพื่อสมัครสมาชิก  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2008.png

 Check Title blog register8
    Wait Until Page Contains  ไม่กรอก Gender  10s
    Sleep    1
    Capture Page Screenshot  Photo/Viwearticle/TC2009.png



*** Test Cases ***
TC2001การสมัครสมาชิก
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawapors2
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongo
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams2
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaporns2@com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    12345678bs
    #วันเกิด
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
    #เพศ
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register 
    sleep    ${Delay}
    Close Browser



TC2002การสมัครสมาชิกไม่กรอกชื่อ
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name

    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongo
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaporns@com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    12345678bs
    #วันเกิด
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
    #เพศ
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register1 
    sleep    ${Delay}
    Close Browser

TC2003การสมัครสมาชิกไม่กรอกนามสกุล
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawapor
    Wait Until Element Is Visible  id=last_name-label

    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaporns@com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    12345678bs
    #วันเกิด
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
    #เพศ
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register2 
    sleep    ${Delay}
    Close Browser

TC2004การสมัครสมาชิกไม่กรอกUsername
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawapor
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongo
    Wait Until Element Is Visible    id=username-label

    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaporns@com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    12345678bs
    #วันเกิด
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
    #เพศ
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register3 
    sleep    ${Delay}
    Close Browser

TC2005การสมัครสมาชิกไม่กรอกเบอร์โทร
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawapor
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongo
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams
    Wait Until Element Is Visible    id=phone_number-label

    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaporns@com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    12345678bs
    #วันเกิด
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
    #เพศ
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register4 
    sleep    ${Delay}
    Close Browser

TC2006การสมัครสมาชิกไม่กรอกอีเมล์
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawapor
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongo
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span

    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    12345678bs
    #วันเกิด
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
    #เพศ
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register5
    sleep    ${Delay}
    Close Browser

TC2007การสมัครสมาชิกไม่กรอกพาสเวอร์
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawapor
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongo
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaporns@com
    Wait Until Element Is Visible    id=password-label

    #วันเกิด
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
    #เพศ
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register6 
    sleep    ${Delay}
    Close Browser

TC2008การสมัครสมาชิกไม่กรอกวันเกิด
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawapor
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongo
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaporns@com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    12345678bs
    #วันเกิด
    #Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    #Click Element    css=#register-form > div:nth-child(6) > div > div > button
    #Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    

    #Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    

    #เพศ
    Click Element    xpath=//input[@name='gender' and @value='other']
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register7
    sleep    ${Delay}
    Close Browser

TC2009การสมัครสมาชิกไม่กรอกเพศ
    Open Browser    ${URL}    ${Browser}
    
    Click Button    id=register-button
    Click Button    id=first_name
    Input Text    name=first_name    nawapor
    Wait Until Element Is Visible  id=last_name-label
    Input Text    name=last_name    boongo
    Wait Until Element Is Visible    id=username-label
    Input Text    id=username    dreams
    Wait Until Element Is Visible    id=phone_number-label
    Input Text    id=phone_number    0987654321
    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
    Input Text    name=email    nawaporns@com
    Wait Until Element Is Visible    id=password-label
    Input Text    id=password    12345678bs
    #วันเกิด
    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
    Click Element    css=#register-form > div:nth-child(6) > div > div > button
    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
    #เพศ
    Click Element    xpath=//button[contains(text(),'Register')]
    sleep    ${Delay}
    Check Title blog register8
    sleep    ${Delay}
    Close Browser

#TC2010การสมัครสมาชิกข้อมูลซ้ำ
#    Open Browser    ${URL}    ${Browser}
    
#    Click Button    id=register-button
#    Click Button    id=first_name
#    Input Text    name=first_name    nattavut2
#    Wait Until Element Is Visible  id=last_name-label
#    Input Text    name=last_name    keawmaha2
#    Wait Until Element Is Visible    id=username-label
#    Input Text    id=username    nattNa1
 #   Wait Until Element Is Visible    id=phone_number-label
#    Input Text    id=phone_number    0891234568
#    Wait Until Element Is Visible    xpath=//label[@id='email-label']/span
#    Input Text    name=email    natt1@gmail.com
#    Wait Until Element Is Visible    id=password-label
#    Input Text    id=password    23456789l1
    
#    Wait Until Element Is Visible    xpath=//input[@placeholder='MM/DD/YYYY' and @type='text']    timeout=10s
#    Click Element    css=#register-form > div:nth-child(6) > div > div > button
#    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button    20s
#    Click Button  xpath=/html/body/div[2]/div[2]/div/div/div/div[1]/div[1]/button

#    Wait Until Element Is Visible    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button    timeout=30s
#    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[103]/button
#    Click Element    xpath=/html/body/div[2]/div[2]/div/div/div/div[2]/div/div/div[2]/div/div[3]/button[5]
 
#    Click Element    xpath=//input[@name='gender' and @value='other']
#    Click Element    xpath=//button[contains(text(),'Register')]
#    sleep    ${Delay}
#    Check Title blog register9
#    sleep    ${Delay}
#    Close Browser