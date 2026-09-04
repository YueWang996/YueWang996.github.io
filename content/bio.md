I am a PhD student in Electronic and Electrical Engineering at the University of Southampton. I work on legged locomotion and robot learning, and I built the quadruped that my experiments run on.

![A self-built 8-DoF quadruped carrying the SPARC active spine, standing in grass](/robot_dog_field.jpg)

Parts and transmission, circuit boards, firmware, dynamics, controllers, and the learning policies on top: I have been through the whole chain myself. So when I look at a control algorithm I tend to ask first how it lands on hardware. Which board does it run on, how much time margin is left in the loop, and whether backlash in the gearbox will eat the gain I just tuned.

![The first prototype in 2023, on the carpet with a Raspberry Pi strapped to it](/early_dog.jpg)

That is where it started, in 2023, on a carpet surrounded by loose parts.

The robot weighs 6.66 kg and has eight degrees of freedom. I started building it alone in 2023. The legs use a parallel joint arrangement with belt-driven knees to keep leg inertia low, and the main controller is an STM32G473 board I laid out myself, closing the loop at 1 kHz under FreeRTOS. Pinocchio and RBDL do not fit on a microcontroller, so I rewrote floating-base rigid body dynamics in C. RNEA and CRBA together take 290 µs per cycle, which leaves about 70% of the 1 ms budget free.

On that robot sits SPARC, a 1.26 kg three-degree-of-freedom active compliant spine that lets the trunk bend and extend along its axis at the same time. Across 97 bounding runs on hardware, the compliant spine under impedance control reached 1.029 m/s, 1.53 times the rigid-spine maximum. I am now putting the same question through Isaac Lab with Adversarial Motion Priors, to find out what an articulated spine actually does for a learned gait.
