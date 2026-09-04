## 四足机器狗与 SPARC 主动柔性脊柱

*2023 至今。自研整机，8 自由度，6.66 kg。*

机械结构、传动、电控板和整机装配都是从零做的，另外做了 SPARC，一个 1.26 kg、3 自由度的柔性脊柱模块。刚体动力学、任务空间阻抗控制和摩擦补偿跑在自己画的 STM32G473 板子上，FreeRTOS，1 kHz 闭环。

![装配 SPARC 主动柔性脊柱的 8 自由度四足机器人](/spined_dog.png)

脊柱把一个转动自由度和一个直动自由度组合在一起，躯干能弯，也能沿轴向伸缩。浮动基阻抗控制器在任务空间里设定刚度和阻尼；下面这个台架覆盖 300 至 700 N/m 的指令刚度，跟踪误差不超过 1.5%。

![SPARC 脊柱实物与推拉测试台架](/spine_real.jpg)

![系统集成：阻抗控制器输出脊柱力矩，Raibert 启发式轨迹生成器输出腿部力矩](/sparc_control.png)

实机上 97 次 bounding 实验，最高速度 1.029 m/s，是刚性脊柱的 1.53 倍。

**技术栈：** Inventor、3D 打印、带传动、STM32G473、CAN、IMU、RNEA / CRBA、任务空间阻抗

[项目仓库](https://github.com/YueWang996/sparc) · [C/C++ 动力学库](https://github.com/YueWang996/robot-dynamics-c) · [arXiv 论文](https://arxiv.org/abs/2510.01984)

## 主动脊柱到底给学出来的步态带来什么

*2025 至今。Isaac Lab，对抗式动作先验。*

把猎豹奔跑的动捕片段重定向到 11 自由度的带脊柱四足模型上，当作 AMP 的风格参考。三种脊柱范式用完全相同的奖励、网络和训练日程训练，唯一的差别是脊柱的控制接口：刚性锁死、端到端直接驱动、任务空间阻抗。

![Isaac Lab 里数十个四足机器人并行训练](/rl_training.jpg)

三个评估任务：按指令速度奔驰、跨越沟壑、从侧向推力中恢复。

![奔驰](/rl_scene_gallop.jpg)

![跨沟](/rl_scene_gap.jpg)

![侧向扰动](/rl_scene_push.jpg)

结论是脊柱并不降低稳态运输成本，刚性躯干在每个采样速度上都最省电。端到端主动脊柱最接近猎豹的步态学，3 m/s 时步长比刚性长约 35%；任务空间阻抗脊柱抗扰性最好，2.0 m/s 侧推下几乎不摔。这些都是仿真结果，实机迁移还没做。

**技术栈：** Isaac Lab、Newton / MJWarp、4096 环境、AMP、PPO / skrl、AcinoSet 动捕

## BARD

*2026。GPU 批量可微分刚体动力学。ICANN 2026。*

原生 PyTorch 写的浮动基机器人动力学库，支持 URDF、FK、Jacobian、RNEA、CRBA、ABA 和自动微分，可以直接接进强化学习或轨迹优化。H200、batch=4096 下，FK 与 Jacobian 吞吐分别达到 Pinocchio 的 64 倍与 63 倍。

![BARD 架构](/papers/bard.png)

[项目仓库](https://github.com/YueWang996/bard-pytorch-dynamics) · [arXiv 论文](https://arxiv.org/abs/2605.31481)

## Quattro

*2025。Transformer 加速 iLQR / MPC。IEEE CDC 2025。*

用 Transformer 并行预测 iLQR 的反馈和前馈矩阵，再把算法和 FPGA 做软硬件协同部署。四旋翼单次优化迭代最高提速 27 倍，MPC 整体提速 17.8 倍，FPGA 上最高 27.3 倍。

![iLQR-TF 框架](/papers/quattro.png)

[项目仓库](https://github.com/YueWang996/quattro-transformer-ilqr) · [arXiv 论文](https://arxiv.org/abs/2504.01806)

## FOCX

*2021 — 2022。电机驱动与双轮足机器人。*

基于 ESP32 的低成本 BLDC 矢量控制板，位置、速度、力矩三个闭环都做了。用这块驱动搭了一台双轮足机器人，靠 LQR 站住。

![自己设计的控制与电源板](/pcb.jpg)

[项目仓库](https://github.com/YueWang996/FOCX)
