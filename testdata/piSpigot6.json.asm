MBB:0042 
0x00007fb0e0118118:   90                               nop
0x00007fb0e0118119:   f2 0f 10 05 e7 ff ff ff          movsd  -0x19(%rip),%xmm0        # 0x00007fb0e0118108
0x00007fb0e0118121:   48 b8 00 00 00 00 00 00 00 00    movabs $0x0,%rax
MBB:0043 
0x00007fb0e011812b:   48 3b c7                         cmp    %rdi,%rax
0x00007fb0e011812e:   0f 8d 09 01 00 00                jge    0x00007fb0e011823d
MBB:0044 
0x00007fb0e0118134:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e011813e:   48 ba 00 00 00 00 00 00 00 00    movabs $0x0,%rdx
MBB:0045 
0x00007fb0e0118148:   48 3b d0                         cmp    %rax,%rdx
0x00007fb0e011814b:   0f 8d 20 00 00 00                jge    0x00007fb0e0118171
MBB:0046 
0x00007fb0e0118151:   48 be 10 00 00 00 00 00 00 00    movabs $0x10,%rsi
0x00007fb0e011815b:   48 0f af ce                      imul   %rsi,%rcx
0x00007fb0e011815f:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0118169:   48 03 d6                         add    %rsi,%rdx
0x00007fb0e011816c:   e9 d7 ff ff ff                   jmpq   0x00007fb0e0118148
MBB:0047 
0x00007fb0e0118171:   48 ba 08 00 00 00 00 00 00 00    movabs $0x8,%rdx
0x00007fb0e011817b:   48 be 01 00 00 00 00 00 00 00    movabs $0x1,%rsi
0x00007fb0e0118185:   49 b8 04 00 00 00 00 00 00 00    movabs $0x4,%r8
0x00007fb0e011818f:   49 b9 05 00 00 00 00 00 00 00    movabs $0x5,%r9
0x00007fb0e0118199:   49 ba 06 00 00 00 00 00 00 00    movabs $0x6,%r10
0x00007fb0e01181a3:   f2 0f 10 0d 55 ff ff ff          movsd  -0xab(%rip),%xmm1        # 0x00007fb0e0118100
0x00007fb0e01181ab:   f2 48 0f 2a d1                   cvtsi2sd %rcx,%xmm2
0x00007fb0e01181b0:   f2 0f 5e ca                      divsd  %xmm2,%xmm1
0x00007fb0e01181b4:   f2 0f 10 15 3c ff ff ff          movsd  -0xc4(%rip),%xmm2        # 0x00007fb0e01180f8
0x00007fb0e01181bc:   f2 0f 10 1d 2c ff ff ff          movsd  -0xd4(%rip),%xmm3        # 0x00007fb0e01180f0
0x00007fb0e01181c4:   f2 0f 10 25 1c ff ff ff          movsd  -0xe4(%rip),%xmm4        # 0x00007fb0e01180e8
0x00007fb0e01181cc:   f2 0f 10 2d 0c ff ff ff          movsd  -0xf4(%rip),%xmm5        # 0x00007fb0e01180e0
0x00007fb0e01181d4:   48 b9 01 00 00 00 00 00 00 00    movabs $0x1,%rcx
0x00007fb0e01181de:   4c 8b d8                         mov    %rax,%r11
0x00007fb0e01181e1:   4c 03 d9                         add    %rcx,%r11
0x00007fb0e01181e4:   48 0f af d0                      imul   %rax,%rdx
0x00007fb0e01181e8:   48 8b c2                         mov    %rdx,%rax
0x00007fb0e01181eb:   48 03 c6                         add    %rsi,%rax
0x00007fb0e01181ee:   48 8b ca                         mov    %rdx,%rcx
0x00007fb0e01181f1:   49 03 c8                         add    %r8,%rcx
0x00007fb0e01181f4:   48 8b f2                         mov    %rdx,%rsi
0x00007fb0e01181f7:   49 03 f1                         add    %r9,%rsi
0x00007fb0e01181fa:   49 03 d2                         add    %r10,%rdx
0x00007fb0e01181fd:   f2 48 0f 2a f0                   cvtsi2sd %rax,%xmm6
0x00007fb0e0118202:   f2 0f 5e d6                      divsd  %xmm6,%xmm2
0x00007fb0e0118206:   f2 48 0f 2a f1                   cvtsi2sd %rcx,%xmm6
0x00007fb0e011820b:   f2 0f 5e de                      divsd  %xmm6,%xmm3
0x00007fb0e011820f:   f2 0f 5c d3                      subsd  %xmm3,%xmm2
0x00007fb0e0118213:   f2 48 0f 2a de                   cvtsi2sd %rsi,%xmm3
0x00007fb0e0118218:   f2 0f 5e e3                      divsd  %xmm3,%xmm4
0x00007fb0e011821c:   f2 0f 5c d4                      subsd  %xmm4,%xmm2
0x00007fb0e0118220:   f2 48 0f 2a da                   cvtsi2sd %rdx,%xmm3
0x00007fb0e0118225:   f2 0f 5e eb                      divsd  %xmm3,%xmm5
0x00007fb0e0118229:   f2 0f 5c d5                      subsd  %xmm5,%xmm2
0x00007fb0e011822d:   f2 0f 59 ca                      mulsd  %xmm2,%xmm1
0x00007fb0e0118231:   f2 0f 58 c1                      addsd  %xmm1,%xmm0
0x00007fb0e0118235:   49 8b c3                         mov    %r11,%rax
0x00007fb0e0118238:   e9 ee fe ff ff                   jmpq   0x00007fb0e011812b
MBB:0048 
0x00007fb0e011823d:   c3                               retq   
