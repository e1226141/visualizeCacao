MBB:0049 
0x00007fb0e01183d0:   90                               nop
0x00007fb0e01183d1:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e01183c0
0x00007fb0e01183d9:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0050 
0x00007fb0e01183e3:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e01183e6:   0f 8d 09 01 00 00                jge    0x00007fb0e01184f5
MBB:0051 
0x00007fb0e01183ec:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e01183f6:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0052 
0x00007fb0e0118400:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e0118403:   0f 8d 20 00 00 00                jge    0x00007fb0e0118429
MBB:0053 
0x00007fb0e0118409:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e0118413:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e0118417:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0118421:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e0118424:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0118400
MBB:0054 
0x00007fb0e0118429:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e0118433:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e011843d:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e0118447:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0118451:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e011845b:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e01183b8
0x00007fb0e0118463:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0118468:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e011846c:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e01183b0
0x00007fb0e0118474:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e01183a8
0x00007fb0e011847c:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e01183a0
0x00007fb0e0118484:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0118398
0x00007fb0e011848c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0118496:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0118499:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e011849c:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e01184a0:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e01184a3:   48 03 c6                         add    %rsi,%rax
0x00007fb0e01184a6:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e01184a9:   49 03 c8                         add    %r8,%rcx
0x00007fb0e01184ac:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e01184af:   49 03 f1                         add    %r9,%rsi
0x00007fb0e01184b2:   49 03 d2                         add    %r10,%rdx
0x00007fb0e01184b5:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e01184ba:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e01184be:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e01184c3:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e01184c7:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e01184cb:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e01184d0:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e01184d4:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e01184d8:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e01184dd:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e01184e1:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e01184e5:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e01184e9:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e01184ed:   49 8b c3                         mov    %r11,%rax
0x00007fb0e01184f0:   e9 ee fe ff ff                   jmpq   0x00007fb0e01183e3
MBB:0055 
0x00007fb0e01184f5:   c3                               retq   
