MBB:0021 
0x00007fb0e01178f0:   90                               nop
0x00007fb0e01178f1:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e01178e0
0x00007fb0e01178f9:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0022 
0x00007fb0e0117903:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e0117906:   0f 8d 09 01 00 00                jge    0x00007fb0e0117a15
MBB:0023 
0x00007fb0e011790c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0117916:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0024 
0x00007fb0e0117920:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e0117923:   0f 8d 20 00 00 00                jge    0x00007fb0e0117949
MBB:0025 
0x00007fb0e0117929:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e0117933:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e0117937:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0117941:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e0117944:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0117920
MBB:0026 
0x00007fb0e0117949:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e0117953:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e011795d:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e0117967:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0117971:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e011797b:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e01178d8
0x00007fb0e0117983:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0117988:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e011798c:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e01178d0
0x00007fb0e0117994:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e01178c8
0x00007fb0e011799c:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e01178c0
0x00007fb0e01179a4:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e01178b8
0x00007fb0e01179ac:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e01179b6:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e01179b9:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e01179bc:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e01179c0:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e01179c3:   48 03 c6                         add    %rsi,%rax
0x00007fb0e01179c6:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e01179c9:   49 03 c8                         add    %r8,%rcx
0x00007fb0e01179cc:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e01179cf:   49 03 f1                         add    %r9,%rsi
0x00007fb0e01179d2:   49 03 d2                         add    %r10,%rdx
0x00007fb0e01179d5:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e01179da:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e01179de:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e01179e3:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e01179e7:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e01179eb:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e01179f0:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e01179f4:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e01179f8:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e01179fd:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0117a01:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e0117a05:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0117a09:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0117a0d:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0117a10:   e9 ee fe ff ff                   jmpq   0x00007fb0e0117903
MBB:0027 
0x00007fb0e0117a15:   c3                               retq   
