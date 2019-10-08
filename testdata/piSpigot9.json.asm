MBB:0063 
0x00007fb0e0118940:   90                               nop
0x00007fb0e0118941:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0118930
0x00007fb0e0118949:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0064 
0x00007fb0e0118953:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e0118956:   0f 8d 09 01 00 00                jge    0x00007fb0e0118a65
MBB:0065 
0x00007fb0e011895c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0118966:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0066 
0x00007fb0e0118970:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e0118973:   0f 8d 20 00 00 00                jge    0x00007fb0e0118999
MBB:0067 
0x00007fb0e0118979:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e0118983:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e0118987:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0118991:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e0118994:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0118970
MBB:0068 
0x00007fb0e0118999:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e01189a3:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e01189ad:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e01189b7:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e01189c1:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e01189cb:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0118928
0x00007fb0e01189d3:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e01189d8:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e01189dc:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0118920
0x00007fb0e01189e4:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0118918
0x00007fb0e01189ec:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0118910
0x00007fb0e01189f4:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0118908
0x00007fb0e01189fc:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0118a06:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0118a09:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0118a0c:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0118a10:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e0118a13:   48 03 c6                         add    %rsi,%rax
0x00007fb0e0118a16:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0118a19:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0118a1c:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0118a1f:   49 03 f1                         add    %r9,%rsi
0x00007fb0e0118a22:   49 03 d2                         add    %r10,%rdx
0x00007fb0e0118a25:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0118a2a:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0118a2e:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e0118a33:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e0118a37:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0118a3b:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0118a40:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e0118a44:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0118a48:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0118a4d:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0118a51:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e0118a55:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0118a59:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0118a5d:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0118a60:   e9 ee fe ff ff                   jmpq   0x00007fb0e0118953
MBB:0069 
0x00007fb0e0118a65:   c3                               retq   
