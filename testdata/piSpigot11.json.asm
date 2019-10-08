MBB:0077 
0x00007fb0e0118eb0:   90                               nop
0x00007fb0e0118eb1:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0118ea0
0x00007fb0e0118eb9:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0078 
0x00007fb0e0118ec3:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e0118ec6:   0f 8d 09 01 00 00                jge    0x00007fb0e0118fd5
MBB:0079 
0x00007fb0e0118ecc:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0118ed6:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0080 
0x00007fb0e0118ee0:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e0118ee3:   0f 8d 20 00 00 00                jge    0x00007fb0e0118f09
MBB:0081 
0x00007fb0e0118ee9:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e0118ef3:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e0118ef7:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0118f01:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e0118f04:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0118ee0
MBB:0082 
0x00007fb0e0118f09:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e0118f13:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0118f1d:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e0118f27:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0118f31:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e0118f3b:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0118e98
0x00007fb0e0118f43:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e0118f48:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e0118f4c:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e0118e90
0x00007fb0e0118f54:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e0118e88
0x00007fb0e0118f5c:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e0118e80
0x00007fb0e0118f64:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e0118e78
0x00007fb0e0118f6c:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e0118f76:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e0118f79:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e0118f7c:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e0118f80:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e0118f83:   48 03 c6                         add    %rsi,%rax
0x00007fb0e0118f86:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e0118f89:   49 03 c8                         add    %r8,%rcx
0x00007fb0e0118f8c:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e0118f8f:   49 03 f1                         add    %r9,%rsi
0x00007fb0e0118f92:   49 03 d2                         add    %r10,%rdx
0x00007fb0e0118f95:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0118f9a:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0118f9e:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e0118fa3:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e0118fa7:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0118fab:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0118fb0:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e0118fb4:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0118fb8:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0118fbd:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0118fc1:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e0118fc5:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0118fc9:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0118fcd:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0118fd0:   e9 ee fe ff ff                   jmpq   0x00007fb0e0118ec3
MBB:0083 
0x00007fb0e0118fd5:   c3                               retq   
