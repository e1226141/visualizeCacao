MBB:0007 
0x00007fb0e0117380:   90                               nop
0x00007fb0e0117381:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0117370
0x00007fb0e0117389:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0008 
0x00007fb0e0117393:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e0117396:   0f 8d 09 01 00 00                jge    0x00007fb0e01174a5
MBB:0009 
0x00007fb0e011739c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e01173a6:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0010 
0x00007fb0e01173b0:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e01173b3:   0f 8d 20 00 00 00                jge    0x00007fb0e01173d9
MBB:0011 
0x00007fb0e01173b9:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e01173c3:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e01173c7:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01173d1:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e01173d4:   e9 d7 ff ff ff                   jmpq   0x00007fb0e01173b0
MBB:0012 
0x00007fb0e01173d9:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e01173e3:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01173ed:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e01173f7:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0117401:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e011740b:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0117368
0x00007fb0e0117413:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0117418:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e011741c:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0117360
0x00007fb0e0117424:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0117358
0x00007fb0e011742c:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0117350
0x00007fb0e0117434:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0117348
0x00007fb0e011743c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0117446:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0117449:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e011744c:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0117450:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e0117453:   48 03 c6                         add    %rsi,%rax
0x00007fb0e0117456:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0117459:   49 03 c8                         add    %r8,%rcx
0x00007fb0e011745c:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e011745f:   49 03 f1                         add    %r9,%rsi
0x00007fb0e0117462:   49 03 d2                         add    %r10,%rdx
0x00007fb0e0117465:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e011746a:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e011746e:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e0117473:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e0117477:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e011747b:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0117480:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e0117484:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0117488:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e011748d:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0117491:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e0117495:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0117499:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e011749d:   49 8b c3                         mov    %r11,%rax
0x00007fb0e01174a0:   e9 ee fe ff ff                   jmpq   0x00007fb0e0117393
MBB:0013 
0x00007fb0e01174a5:   c3                               retq   
