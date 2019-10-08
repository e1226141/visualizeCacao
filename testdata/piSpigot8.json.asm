MBB:0056 
0x00007fb0e0118688:   90                               nop
0x00007fb0e0118689:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0118678
0x00007fb0e0118691:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0057 
0x00007fb0e011869b:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e011869e:   0f 8d 09 01 00 00                jge    0x00007fb0e01187ad
MBB:0058 
0x00007fb0e01186a4:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e01186ae:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0059 
0x00007fb0e01186b8:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e01186bb:   0f 8d 20 00 00 00                jge    0x00007fb0e01186e1
MBB:0060 
0x00007fb0e01186c1:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e01186cb:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e01186cf:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01186d9:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e01186dc:   e9 d7 ff ff ff                   jmpq   0x00007fb0e01186b8
MBB:0061 
0x00007fb0e01186e1:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e01186eb:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01186f5:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e01186ff:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0118709:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e0118713:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0118670
0x00007fb0e011871b:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0118720:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e0118724:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0118668
0x00007fb0e011872c:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0118660
0x00007fb0e0118734:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0118658
0x00007fb0e011873c:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0118650
0x00007fb0e0118744:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e011874e:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0118751:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0118754:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0118758:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e011875b:   48 03 c6                         add    %rsi,%rax
0x00007fb0e011875e:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0118761:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0118764:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0118767:   49 03 f1                         add    %r9,%rsi
0x00007fb0e011876a:   49 03 d2                         add    %r10,%rdx
0x00007fb0e011876d:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0118772:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0118776:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e011877b:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e011877f:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0118783:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0118788:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e011878c:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0118790:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0118795:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0118799:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e011879d:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e01187a1:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e01187a5:   49 8b c3                         mov    %r11,%rax
0x00007fb0e01187a8:   e9 ee fe ff ff                   jmpq   0x00007fb0e011869b
MBB:0062 
0x00007fb0e01187ad:   c3                               retq   
