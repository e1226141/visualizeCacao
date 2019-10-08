MBB:0070 
0x00007fb0e0118bf8:   90                               nop
0x00007fb0e0118bf9:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0118be8
0x00007fb0e0118c01:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0071 
0x00007fb0e0118c0b:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e0118c0e:   0f 8d 09 01 00 00                jge    0x00007fb0e0118d1d
MBB:0072 
0x00007fb0e0118c14:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0118c1e:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0073 
0x00007fb0e0118c28:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e0118c2b:   0f 8d 20 00 00 00                jge    0x00007fb0e0118c51
MBB:0074 
0x00007fb0e0118c31:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e0118c3b:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e0118c3f:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0118c49:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e0118c4c:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0118c28
MBB:0075 
0x00007fb0e0118c51:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e0118c5b:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0118c65:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e0118c6f:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0118c79:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e0118c83:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0118be0
0x00007fb0e0118c8b:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0118c90:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e0118c94:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0118bd8
0x00007fb0e0118c9c:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0118bd0
0x00007fb0e0118ca4:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0118bc8
0x00007fb0e0118cac:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0118bc0
0x00007fb0e0118cb4:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0118cbe:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0118cc1:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0118cc4:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0118cc8:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e0118ccb:   48 03 c6                         add    %rsi,%rax
0x00007fb0e0118cce:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0118cd1:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0118cd4:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0118cd7:   49 03 f1                         add    %r9,%rsi
0x00007fb0e0118cda:   49 03 d2                         add    %r10,%rdx
0x00007fb0e0118cdd:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0118ce2:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0118ce6:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e0118ceb:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e0118cef:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0118cf3:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0118cf8:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e0118cfc:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0118d00:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0118d05:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0118d09:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e0118d0d:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0118d11:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0118d15:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0118d18:   e9 ee fe ff ff                   jmpq   0x00007fb0e0118c0b
MBB:0076 
0x00007fb0e0118d1d:   c3                               retq   
