# 6 Flame module

Sheenbot 支持标准 38 kHz 红外遥控协议。

## 接线示意

- **IR_RX** → 板子 GPIO 3  
- **VCC**   → 5V  
- **GND**   → GND

## 示例代码（Mind+ / JavaScript）

```js
const ir = sheenbot.IR
ir.init(3)           // IR 接收脚为 GPIO3

ir.onKey((code) => {
  if (code === ir.KEY_UP) {
    sheenbot.motor.forward(50)
  }
  if (code === ir.KEY_DOWN) {
    sheenbot.motor.backward(50)
  }
})
