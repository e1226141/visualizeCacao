MBB:0014 
0x00007fb0e0117638:   90                               nop
0x00007fb0e0117639:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0117628
0x00007fb0e0117641:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0015 
0x00007fb0e011764b:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e011764e:   0f 8d 09 01 00 00                jge    0x00007fb0e011775d
MBB:0016 
0x00007fb0e0117654:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e011765e:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0017 
0x00007fb0e0117668:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e011766b:   0f 8d 20 00 00 00                jge    0x00007fb0e0117691
MBB:0018 
0x00007fb0e0117671:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e011767b:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e011767f:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0117689:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e011768c:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0117668
MBB:0019 
0x00007fb0e0117691:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e011769b:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01176a5:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e01176af:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e01176b9:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e01176c3:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0117620
0x00007fb0e01176cb:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e01176d0:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e01176d4:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0117618
0x00007fb0e01176dc:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0117610
0x00007fb0e01176e4:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0117608
0x00007fb0e01176ec:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0117600
0x00007fb0e01176f4:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e01176fe:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0117701:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0117704:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0117708:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e011770b:   48 03 c6                         add    %rsi,%rax
0x00007fb0e011770e:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0117711:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0117714:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0117717:   49 03 f1                         add    %r9,%rsi
0x00007fb0e011771a:   49 03 d2                         add    %r10,%rdx
0x00007fb0e011771d:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0117722:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0117726:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e011772b:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e011772f:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0117733:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0117738:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e011773c:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0117740:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0117745:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0117749:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e011774d:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0117751:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0117755:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0117758:   e9 ee fe ff ff                   jmpq   0x00007fb0e011764b
MBB:0020 
0x00007fb0e011775d:   c3                               retq   
