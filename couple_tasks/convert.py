import random
import json

with open('things.ini', encoding='utf-8') as f:
    things = f.readlines()

# const consts = {
#   // 奖品清单
#   prizeList: [
#     {
#       prizeName: '小米手机',
#       prizeImg: 'https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png'
#     },
#     ...
#   ]
#   prizeBgColors: [
#     'rgb(255, 231, 149)',
#     'rgb(255, 247, 223)',
#     'rgb(255, 231, 149)',
#     'rgb(255, 247, 223)',
#     'rgb(255, 231, 149)',
#     'rgb(255, 247, 223)'
#   ],
#   // 每一块扇形的外边框颜色
#   borderColor: '#ff9800'
# }

prize_list = []
prize_bg_colors = []

for thing in things:
    prize_list.append({
        'prizeName': thing.strip()
    })

    g = random.randint(200, 250)
    b = random.randint(200, 250)
    prize_bg_colors.append(f'rgb(255, {g}, {b})')

consts = {
    'prizeList': prize_list,
    'prizeBgColors': prize_bg_colors,
    'borderColor': '#ff9800'
}

const_str = json.dumps(consts)

with open('consts.js', 'w') as f:
    f.write(f"const consts = {const_str}")