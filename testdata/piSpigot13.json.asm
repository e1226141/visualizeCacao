MBB:0091 
0x00007fb0e0119420:   90                               nop
0x00007fb0e0119421:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0119410
0x00007fb0e0119429:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0092 
0x00007fb0e0119433:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e0119436:   0f 8d 09 01 00 00                jge    0x00007fb0e0119545
MBB:0093 
0x00007fb0e011943c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0119446:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0094 
0x00007fb0e0119450:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e0119453:   0f 8d 20 00 00 00                jge    0x00007fb0e0119479
MBB:0095 
0x00007fb0e0119459:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e0119463:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e0119467:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0119471:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e0119474:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0119450
MBB:0096 
0x00007fb0e0119479:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e0119483:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e011948d:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e0119497:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e01194a1:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e01194ab:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0119408
0x00007fb0e01194b3:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e01194b8:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e01194bc:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0119400
0x00007fb0e01194c4:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e01193f8
0x00007fb0e01194cc:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e01193f0
0x00007fb0e01194d4:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e01193e8
0x00007fb0e01194dc:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e01194e6:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e01194e9:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e01194ec:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e01194f0:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e01194f3:   48 03 c6                         add    %rsi,%rax
0x00007fb0e01194f6:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e01194f9:   49 03 c8                         add    %r8,%rcx
0x00007fb0e01194fc:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e01194ff:   49 03 f1                         add    %r9,%rsi
0x00007fb0e0119502:   49 03 d2                         add    %r10,%rdx
0x00007fb0e0119505:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e011950a:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e011950e:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e0119513:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e0119517:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e011951b:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0119520:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e0119524:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0119528:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e011952d:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0119531:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e0119535:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0119539:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e011953d:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0119540:   e9 ee fe ff ff                   jmpq   0x00007fb0e0119433
MBB:0097 
0x00007fb0e0119545:   c3                               retq   
