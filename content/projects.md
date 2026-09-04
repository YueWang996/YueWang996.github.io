## Quadruped robot and the SPARC active spine

*2023 - present. Self-built hardware, 8 DoF, 6.66 kg.*

Mechanical structure, transmission, control boards and final assembly all done from scratch, plus SPARC, a 1.26 kg three-DoF compliant spine module. Rigid body dynamics, task-space impedance control and friction compensation run at 1 kHz under FreeRTOS on an STM32G473 I laid out myself.

![The 8-DoF quadruped with the SPARC active spine](/spined_dog.png)

The spine combines a revolute and a prismatic degree of freedom, so the trunk can bend and extend along its axis at once. A floating-base impedance controller sets stiffness and damping in task space; the bench rig below covers 300 to 700 N/m of commanded stiffness with tracking error under 1.5%.

![SPARC spine hardware on the push-pull test rig](/spine_real.jpg)

![System integration: the impedance controller drives the spine while a Raibert heuristic generates leg torques](/sparc_control.png)

On hardware, 97 bounding runs reached 1.029 m/s, 1.53 times the rigid-spine maximum.

**Stack:** Inventor, 3D printing, belt drive, STM32G473, CAN, IMU, RNEA / CRBA, task-space impedance

[Project repository](https://github.com/YueWang996/sparc) · [C/C++ dynamics library](https://github.com/YueWang996/robot-dynamics-c) · [Paper on arXiv](https://arxiv.org/abs/2510.01984)

## What an articulated spine does for a learned gait

*2025 - present. Isaac Lab, Adversarial Motion Priors.*

A galloping-cheetah mocap clip is retargeted onto an 11-DoF spined quadruped and used as the style reference for AMP. Three spine paradigms train under identical rewards, networks and schedules, differing only in the spine control interface: locked rigid, end-to-end actuated, and task-space impedance.

![Isaac Lab, many quadrupeds training in parallel](/rl_training.jpg)

The three evaluation tasks: galloping at a commanded speed, traversing a gap, and recovering from a lateral push.

![Galloping](/rl_scene_gallop.jpg)

![Gap traversing](/rl_scene_gap.jpg)

![Lateral perturbation](/rl_scene_push.jpg)

The spine does not lower steady-state cost of transport; the rigid trunk is the most efficient at every sampled speed. The end-to-end spine recovers cheetah-like stride length, about 35% longer than rigid at 3 m/s, while the impedance spine gives the best push recovery, staying upright under a 2.0 m/s lateral shove. These are simulation results; the hardware transfer is not done.

**Stack:** Isaac Lab, Newton / MJWarp, 4096 envs, AMP, PPO / skrl, AcinoSet mocap

## BARD

*2026. Batched differentiable rigid body dynamics on GPU. ICANN 2026.*

A floating-base robot dynamics library in plain PyTorch: URDF parsing, FK, Jacobians, RNEA, CRBA, ABA and automatic differentiation, ready to drop into reinforcement learning or trajectory optimisation. On an H200 at batch 4096, FK and Jacobian throughput reach 64x and 63x Pinocchio.

![BARD architecture](/papers/bard.png)

[Project repository](https://github.com/YueWang996/bard-pytorch-dynamics) · [Paper on arXiv](https://arxiv.org/abs/2605.31481)

## Quattro

*2025. Transformer-accelerated iLQR and MPC. IEEE CDC 2025.*

A Transformer predicts the feedback and feedforward matrices of iLQR in parallel, then the whole thing is deployed as a hardware-software co-design on FPGA. Up to 27x faster per optimisation iteration on a quadrotor, 17.8x on the full MPC loop, and 27.3x on FPGA.

![The iLQR-TF framework](/papers/quattro.png)

[Project repository](https://github.com/YueWang996/quattro-transformer-ilqr) · [Paper on arXiv](https://arxiv.org/abs/2504.01806)

## FOCX

*2021 - 2022. Motor drives and a two-wheeled legged robot.*

A low-cost ESP32 BLDC field-oriented control board with position, velocity and torque loops. I used my own drives to build a two-wheeled legged robot that balances with LQR.

![Control and power boards I designed](/pcb.jpg)

[Project repository](https://github.com/YueWang996/FOCX)
